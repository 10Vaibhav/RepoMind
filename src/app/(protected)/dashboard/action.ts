"use server"

import 'dotenv/config';
import { Output, streamText } from "ai";
import { createStreamableValue } from "@ai-sdk/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from '@/lib/gemini';
import { db } from '@/server/db';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue();

    const queryVector = await generateEmbedding(question);
    const vectorQuery = `[${queryVector.join(',')}]`

    const result = await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1-("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
    `as { fileName: string, sourceCode: string, summary: string }[]

    let context = ""

    for (const doc of result) {
        context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n summary of file: ${doc.summary}`
    }

    (async () => {
        const { textStream } = await streamText({
            model: google("gemini-1.5-flash"),
            prompt: `
You are an AI code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.

AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness. AI is a well-behaved and well-mannered individual. AI is always friendly, kind, and inspiring, and eager to provide vivid and thoughtful responses to the user.

AI has the sum of all knowledge in their brain and can accurately answer nearly any question about any topic in conversation. If the question is asking about code or a specific file, AI will provide a detailed answer, giving step-by-step instructions, including code snippets.

START CONTEXT BLOCK
${context}
END OF CONTEXT BLOCK

START QUESTION
${question}
END OF QUESTION

AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
If the context does not provide the answer to the question, the AI assistant will say: 
"I'm sorry, but I don't know the answer."
AI assistant will not apologize for previous responses, but instead will indicate that new information was gained.
AI assistant will not invent anything that is not drawn directly from the context.

## Rules for Responses:
1. **Start with plain text explanation** before using Markdown.  
   - Introduce the answer in simple, structured sentences.  
   - Then, format the detailed explanation in Markdown.  

2. **Markdown Usage** (only where needed):  
   - Use headings, bullet points, or numbered lists for clarity.  
   - Always format code inside fenced blocks (\`\`\`language).  

3. **Code Snippets**:  
   - Provide only relevant snippets directly from the provided CONTEXT BLOCK.  
   - Do not invent or hallucinate code outside the context.  
   - If the context does not contain related code, state clearly:  
     "I'm sorry, but I don't know the answer. Please provide related information for it."  

4. **Clarity for Interns**:  
   - Break explanations into small, simple steps.  
   - Explain what the code is doing and why it’s structured that way.  
   - Provide examples of usage if applicable.  
`
        });

        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done()
    })();

    return {
        output: stream.value,
        filesReferences: result
    }

}
