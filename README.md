# RepoMind

RepoMind is an AI GitHub developer tool that brings your repository knowledge, meetings, and team collaboration into one place. It uses Retrieval-Augmented Generation (RAG) to understand your codebase, summarize meetings, track commits, and answer questions with citations.

Transform your GitHub workflow with AI.

- Connect a repository (public or private)
- Ask natural-language questions about your codebase and docs
- Upload meetings and get AI-generated issue summaries
- See recent commits, team members, and manage invites
- Create/archive projects and collaborate in one dashboard

## How RepoMind works
Three steps to modern, AI-accelerated development:

1. Connect your repo
    - Provide the GitHub URL and optional token for private repos—structure is analyzed automatically.
2. AI analysis
    - The RAG engine processes code, docs, and history to build project understanding.
3. Start collaborating
    - Ask questions, upload meetings, invite members, and leverage insights across your team.

## Features
- Dashboard
  - Ask a Question: Chat with an AI assistant about your project. Answers include summaries, related files, and source citations.
  - Create a New Meeting: Upload meeting recordings to generate AI-based summaries and extract issues discussed.
  - Latest 10 Commits: Auto-fetched from the connected GitHub repo.
  - Team Members: View collaborators who are working on the project through RepoMind.
  - Invite Members: Send invites to collaborate on the project.
  - Archive Project: Archive a project when it’s no longer active.

- Create Project
  - Provide `projectName`, `githubURL`, and optionally a `githubToken` for private repos.
  - Initializes indexing and RAG ingestion for code/docs/commit history.

- Q&A (RAG-powered)
  - Ask questions about the codebase and docs.
  - Displays previous questions and AI answers, with AI-based summary and related files used as context.

- Meetings
  - See all uploaded meetings with options to View or Delete.
  - View Meeting: Drill into AI-detected issues and summaries for the selected meeting.
  - Delete Meeting: Remove a meeting from the project.

- GitHub Integration
  - Fetches latest 10 commits, authors, messages, and timestamps.
  - Uses an optional GitHub token for private repositories or higher rate limits.

## Tech Stack
- Next.js (App Router) in
- TypeScript throughout 
- Prisma ORM with a SQL database 
- tRPC for type-safe APIs 
- Middleware and auth helpers
- Custom hooks in 
- Server utilities and RAG pipelines in 
- RAG Model: Gemini (for LLM reasoning) + AssemblyAI (for speech-to-text/transcription)

## Architecture Overview
- Ingestion
  - On project creation, RepoMind indexes the repository structure and metadata. Content is chunked and embedded for retrieval.
- RAG Retrieval
  - For every question, RepoMind retrieves the top-N relevant chunks (code, docs, commit messages) as context for the LLM.
- Reasoning
  - Gemini processes the retrieved context to produce grounded answers, summaries, and explanations.
- Meetings
  - AssemblyAI transcribes uploaded audio/video. The transcript is chunked, embedded, and tied to the project. Gemini summarizes and extracts issues.
- Persistence
  - Prisma manages relational data: users, projects, members, questions/answers, meetings, issues, and embeddings metadata.
- API
  - tRPC exposes type-safe endpoints consumed by the Next.js App Router.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
