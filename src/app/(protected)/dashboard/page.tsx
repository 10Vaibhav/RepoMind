"use client";

import useProject from "@/hooks/use-project";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";

const DashboardPage = () => {
  const { project } = useProject();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Github link */}
        <div className="bg-primary w-full sm:w-fit rounded-lg px-4 py-3 shadow-sm">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2 min-w-0 flex-1">
              <p className="text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/90 hover:underline break-all"
                >
                  <span className="truncate">{project?.githubUrl}</span>
                  <ExternalLink className="ml-1 size-4 flex-shrink-0" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <TeamMembers/>
            <InviteButton/>
            <ArchiveButton/>
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard/>
          <MeetingCard/>
        </div>
      </div>

      <div className="mt-8"></div>
      <CommitLog/>
    </div>
  );
};

export default DashboardPage;
