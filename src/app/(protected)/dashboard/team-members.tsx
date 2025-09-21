"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";


const TeamMembers = () => {

    const {projectId} = useProject();
    const {data: members} = api.project.getTeamMembers.useQuery({projectId});

  return (
    <div className="flex items-center gap-1 sm:gap-2">
        {
            members?.map((member) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={member.id} src={member.user.imageUrl || ''} alt={member.user.firstName || ''} height={24} width={24} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            ))
        }
    </div>
  )
}

export default TeamMembers;
