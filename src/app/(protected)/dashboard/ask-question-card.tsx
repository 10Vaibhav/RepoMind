"use client";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { askQuestion } from "./action";
import { readStreamableValue } from "@ai-sdk/rsc";
import CodeReferences from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFilesReferences([]);
    e.preventDefault();
    if (!project?.id) return;

    setLoading(true);
    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setLoading(false);
  };

  const refetch = useRefetch();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] overflow-hidden p-0 sm:max-w-[80vw]">
          <div className="grid max-h-[85vh] w-full grid-rows-[auto,1fr,auto]">
            <DialogHeader className="border-b p-3 sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <DialogTitle className="flex items-center gap-2">
                  <Image
                    src="/logo.jpeg"
                    alt="RepoMind"
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10"
                  />
                  <span className="text-sm sm:text-base">RepoMind Answer</span>
                </DialogTitle>
                <Button
                  variant={"outline"}
                  disabled = {saveAnswer.isPending}
                  className="w-full sm:w-auto"
                  onClick={() => {
                    saveAnswer.mutate({
                      projectId: project!.id,
                      question,
                      answer,
                      filesReferences,
                    }, {
                      onSuccess: () => {
                        toast.success("Answer Saved!")
                        refetch();
                      },
                      onError: ()=> {
                        toast.error("Failed to Save answer!")
                      }
                    });
                  }}>
                  Save Answer
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4 overflow-auto p-3 sm:p-4">
              <MDEditor.Markdown
                source={answer}
                className="max-h-[40vh] w-full overflow-auto rounded-md p-3"
              />

              <CodeReferences filesReferences={filesReferences} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-1 sm:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] sm:min-h-[120px]"
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              Ask RepoMind!
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
