"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import { Fragment, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const {projectId} = useProject()
  const {data: questions} = api.project.getQuestion.useQuery({projectId});

  const [questionIndex, setQuestionIndex] = useState(0);

  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard/>
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold "> Saved Questions</h1>
      <div className="h-2"></div>

      <div className="flex flex-col gap-2">
        {questions?.map((question, index) => {
          return <Fragment key={question.id}>
                <SheetTrigger onClick={() => setQuestionIndex(index)}>
                  <div className="flex items-start gap-3 bg-card rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <img className="rounded-full flex-shrink-0" height={30} width={30} src={question.user.imageUrl ?? ""}/>

                    <div className="text-left flex flex-col min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                          <p className="text-foreground line-clamp-2 text-sm sm:text-lg font-medium">
                            {question.question}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {question.createdAt.toLocaleDateString()}
                          </span>
                      </div>

                      <p className="text-muted-foreground line-clamp-2 text-xs sm:text-sm mt-1">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>
          </Fragment>
        })}
      </div>

      {
        question && (
          <SheetContent className="w-[95vw] sm:max-w-[80vw] overflow-scroll">
            <SheetHeader>
              <SheetTitle className="text-sm sm:text-base">
                {question.question}
              </SheetTitle>
              <div className="mt-4">
                <MDEditor.Markdown source={question.answer}/>
                <CodeReferences filesReferences={(question.fileReferences ?? []) as any} />
              </div>
            </SheetHeader>
          </SheetContent>
        )
      }
    </Sheet>
  )
}

export default QAPage