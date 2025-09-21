"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api, type RouterOutputs } from "@/trpc/react";
import { VideoIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  meetingId: string;
};

const IssuesList = ({ meetingId }: Props) => {
  const { data: meeting, isLoading } = api.project.getMeetingById.useQuery({ meetingId },
    {
      refetchInterval: 4000,
    },
  );

  if (isLoading || !meeting) return <div>Loading...</div>;

  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-4 sm:gap-x-8 border-b border-accent/30 pb-4 sm:pb-6 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-4 sm:gap-x-6 min-w-0">
            <div className="rounded-full bg-primary p-2 sm:p-3 flex-shrink-0">
              <VideoIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm leading-6 text-muted-foreground">
                Meeting on {""} {meeting.createdAt.toLocaleDateString()}
              </div>
              <div className="mt-1 text-sm sm:text-base leading-6 font-semibold text-foreground truncate">
                {meeting.name}
              </div>
            </div>
          </div>
        </div>
        <div className="h-4"></div>
        <div className="grid grid-cols-1 gap-3 sm:gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {meeting.issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </>
  );
};

function IssueCard({issue}: {issue: NonNullable<RouterOutputs["project"]["getMeetingById"]>["issues"][number]}) {
  const [open, setOpen] = useState(false);

  return (
    <>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base">{issue.gist}</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              {issue.createdAt.toLocaleDateString()}
            </DialogDescription>
            <p className="text-muted-foreground text-sm sm:text-base">
              {issue.headline}
            </p>
            <blockquote className="mt-2 border-l-4 border-accent bg-accent/10 p-3 sm:p-4 rounded-r-lg">
              <span className="text-xs sm:text-sm text-muted-foreground">
                {issue.start} - {issue.end}
              </span>
              <p className="font-medium italic leading-relaxed text-foreground text-sm sm:text-base">
                {issue.summary}
              </p>
            </blockquote>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="relative">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-xl line-clamp-2">{issue.gist}</CardTitle>
          <CardDescription className="text-xs sm:text-sm line-clamp-2">{issue.headline}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <Button onClick={() => setOpen(true)} className="w-full sm:w-auto" size="sm">
            Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default IssuesList;
