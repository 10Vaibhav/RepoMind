"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const {data: meetings, isLoading} = api.project.getMeetings.useQuery({projectId}, {
    refetchInterval: 4000
  });
const refetch = useRefetch();
  const deleteMeeting = api.project.deleteMeeting.useMutation();

  return (
    <>
        <MeetingCard/>
        <div className="h-6"></div>
        <h1 className="text-xl font-semibold">Meetings</h1>
        {meetings && meetings.length === 0 && <div>No Meetings Found</div>}
        {isLoading && <div>Loading...</div>}

        <ul className="divide-y divide-accent/30">
            {meetings?.map(meeting => (
                <li key={meeting.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Link href={`/meetings/${meeting.id}`} className="text-sm font-semibold truncate text-foreground hover:text-primary transition-colors">
                                {meeting.name}
                            </Link>
                            {meeting.status === "PROCESSING" && (
                                <Badge className="bg-primary text-primary-foreground w-fit">
                                    Processing...
                                </Badge>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center text-xs text-muted-foreground sm:gap-x-2">
                            <p className="whitespace-nowrap">
                                {meeting.createdAt.toLocaleDateString()}
                            </p>
                            <p className="truncate">{meeting.issues.length} issues</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-x-4">
                        <Link href={`/meetings/${meeting.id}`} className="w-full sm:w-auto">
                            <Button size='sm' variant="outline" className="w-full sm:w-auto">
                                View Meeting
                            </Button>
                        </Link>
                        <Button 
                            disabled={deleteMeeting.isPending} 
                            size='sm' 
                            variant='destructive' 
                            className="w-full sm:w-auto"
                            onClick={()=> deleteMeeting.mutate({meetingId: meeting.id}, {
                                onSuccess: () => {
                                    toast.success("Meeting deleted successfully");
                                    refetch();
                                }
                            })}
                        >
                            Delete Meeting
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    </>
  )
};

export default MeetingsPage;
