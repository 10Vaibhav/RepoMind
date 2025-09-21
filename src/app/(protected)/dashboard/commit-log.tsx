"use client";

import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });

  return (
    <>
        <ul className="space-y-3 sm:space-y-6">
            {commits?.map((commit, commitIndex) => {
                return <li key={commit.id} className="relative flex gap-x-3 sm:gap-x-4">
                    <div className={cn(
                            commitIndex == commits.length -1 ? 'h-6' : '-bottom-6',
                            'absolute left-0 top-0 flex w-4 sm:w-6 justify-center'
                        )}>
                            <div className="w-px translate-x-1 bg-gray-200"></div>
                    </div>
                    <>
                    <img src={commit.commitAuthorAvatar} alt="commit avatar" className="relative mt-3 sm:mt-4 size-6 sm:size-8 flex-none rounded-full bg-gray-50"/>
                    <div className="flex-auto rounded-lg bg-card p-3 sm:p-4 shadow-sm w-full">
                        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-x-4 items-start">
                            <Link target="_blank" href={`${project?.githubUrl}/commits/${commit.commitHash}`} className="py-0.5 text-xs leading-5 text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                                <span className="font-medium text-foreground">
                                    {commit.commitAuthorName}
                                </span>{" "}
                                <span className="inline-flex items-center">
                                    commited
                                    <ExternalLink className="ml-1 size-3 sm:size-4" />
                                </span>
                            </Link>
                        </div>
                        <p className="font-semibold text-sm sm:text-base block mt-1 text-foreground break-words">
                            {commit.commitMessage}
                        </p>
                        <pre className="mt-2 whitespace-pre-wrap text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">
                            {commit.summary}
                        </pre>
                    </div>
                    </>
                </li>
            })}
        </ul>
    </>
  )
};

export default CommitLog;
