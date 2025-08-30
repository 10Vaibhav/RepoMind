import { db } from "@/server/db";
import {Octokit} from "octokit";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {

    const [owner, repo] = githubUrl.split("/").slice(-2);

    if(!owner || !repo){
        throw new Error("Invalid github url");
    }

    const {data} =  await octokit.rest.repos.listCommits({
        owner: owner,
        repo: repo
    })

    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]

    return sortedCommits.slice(0, 10).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit?.author?.avatar_url ?? "",
        commitDate: commit.commit?.author?.date ?? ""
    }));
}

// console.log(await getCommitHashes(githubUrl));

export const pullCommits = async (projectId: string) => {
    const {project , githubUrl} = await fetchProjectGithubUrl(projectId);
    const commitHashes = await getCommitHashes(githubUrl!);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    console.log(unprocessedCommits);
    return unprocessedCommits;

}


export const fetchProjectGithubUrl = async (projectId: string) => {
    const project = await db.project.findUnique({
        where: {id: projectId},
        select: {
            githubUrl: true
        }
    });

    return {project, githubUrl: project?.githubUrl};
}

async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]){

    const processedCommits = await db.commit.findMany({
        where: {projectId}
    })

    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));
    return unprocessedCommits;

}

// await pullCommits("cmexy2j9v0000qekw9m5muabh").then(console.log);