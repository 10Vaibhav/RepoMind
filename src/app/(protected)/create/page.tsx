"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {

    createProject.mutate({
      githubUrl: data.repoUrl,
      name: data.projectName,
      githubToken: data.githubToken
    },{
      onSuccess: ()=> {
        toast.success("Project created Successfully");
        refetch();
        reset()
      },
      onError: ()=> {
        toast.error("Failed to create project")
      }
    })

    return true;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 sm:gap-12 sm:p-8 min-h-[calc(100vh-8rem)]">
      <div className="text-center">
        <img src="/undraw_github.svg" className="h-40 w-auto sm:h-56 mx-auto mb-6" />
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Link Your Github Repository
          </h1>
          <p className="text-muted-foreground mb-8">Enter the URL of your repository to link it to RepoMind</p>
        </div>
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("repoUrl", { required: true })}
            placeholder="Github URL"
            type="url"
            required
            className="w-full"
          />
          <Input
            {...register("projectName", { required: true })}
            placeholder="Project Name"
            required
            className="w-full"
          />
          <Input
            {...register("githubToken")}
            placeholder="Github Token (Optional)"
            className="w-full"
          />
          <Button type="submit" disabled={createProject.isPending} className="w-full">
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
