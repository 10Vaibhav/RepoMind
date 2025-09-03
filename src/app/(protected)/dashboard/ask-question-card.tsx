"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { askQuestion } from "./action";
import { readStreamableValue } from "@ai-sdk/rsc";

const AskQuestionCard = () => {
    const {project} = useProject();
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [filesReferences, setFilesReferences] = useState<{fileName: string; sourceCode: string; summary: string}[]>([]);
    const [answer, setAnswer] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!project?.id) return;

        setLoading(true);
        setOpen(true);

        const {output, filesReferences} = await askQuestion(question, project.id);
        setFilesReferences(filesReferences);

        for await (const delta of readStreamableValue(output)){
            if(delta){
                setAnswer(ans => ans +delta);
            }
        }
        setLoading(false);
    }

  return (
    <>
        <Dialog open = {open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Image src="/logo.jpeg" alt="RepoMind" width={40} height={40}/>
                    </DialogTitle>
                </DialogHeader>
                {answer}
                {filesReferences.map( (file, index) => {
                    return <span key={index}>{file.fileName}</span>
                })}
            </DialogContent>
        </Dialog>
        <Card className="relative col-span-3">
            <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <Textarea placeholder="which file should I edit to change the home page?" value={question} onChange={e => setQuestion(e.target.value)}/>
                    <div className="h-4"></div>
                    <Button type="submit">
                        Ask RepoMind!
                    </Button>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard;
