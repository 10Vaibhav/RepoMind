"use client";

import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Card } from "@/components/ui/card";
import { uploadFile } from "@/lib/firebase";
import { Presentation, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MeetingCard = () => {

  const { project } = useProject();
  const processMeeting = useMutation({
    mutationFn: async (data : {meetingUrl: string, meetingId: string, projectId: string}) => {
      const {meetingUrl, meetingId, projectId} = data;
      const response = await axios.post("/api/process-meeting", {meetingUrl, meetingId, projectId});
      return response.data;
    }
  });
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const uploadMeeting = api.project.uploadMeeting.useMutation();

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      if(!project) return
      setIsUploading(true);

      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (!file) return;

      const downloadURL = await uploadFile(file as File, setProgress) as string;

      uploadMeeting.mutate({
        projectId: project.id,
        meetingUrl: downloadURL,
        name: file.name
      }, {
        onSuccess: (meeting) => {
          toast.success("Meeting uploaded successfully");
          router.push("/meetings");
          processMeeting.mutateAsync({meetingUrl: downloadURL, meetingId: meeting.id, projectId: project.id});
        },
        onError: () => {
          toast.error("Failed to upload meeting");
        }
      });

      setIsUploading(false);

    },
  });

  return (
    <Card className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px]" {...getRootProps()}>
      {
        !isUploading && (
          <>
          <Presentation className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce"/>
          <h3 className="mt-2 text-sm sm:text-base font-semibold text-foreground text-center">
            Create a new meeting
          </h3>

          <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground px-4">
            Analyse your meeting with RepoMind.
            <br />
            Powered by AI.
          </p>

          <div className="mt-4">
            <Button disabled={isUploading} className="w-full sm:w-auto">
              <Upload className="-ml-0.5 mr-1.5 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true"/>
              Upload Meeting
              <input className="hidden" {...getInputProps()}/>
            </Button>
          </div>
          </>
        )
      }

      {
        isUploading && (
          <div className="flex flex-col items-center">
            <CircularProgressbar value={progress} text={`${progress}%`} className="size-16 sm:size-20" styles={
              buildStyles({
                pathColor: "hsl(var(--primary))",
                textColor: "hsl(var(--primary))",
              })
            }/>
            <p className="mt-2 text-sm text-muted-foreground text-center">Uploading your meeting...</p>
          </div>
        )
      }
    </Card>
  )
};

export default MeetingCard;
