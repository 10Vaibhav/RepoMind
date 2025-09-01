import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
});

export const aiSummarizeCommit = async (diff: string) => {
    // https://github.com/docker/genai-stack/commit/<commithash>.diff

    const response = await model.generateContent([
    `You are an expert programmer tasked with creating clear, accurate commit summaries from git diffs. Your goal is to produce concise bullet points that explain what changed and why it matters.

## Git Diff Format Reference

**File Headers:**
\`\`\`
diff --git a/path/to/file.ext b/path/to/file.ext
index abc123..def456 100644
--- a/path/to/file.ext
+++ b/path/to/file.ext
\`\`\`

**Change Indicators:**
- Lines starting with \`+\` were **added**
- Lines starting with \`-\` were **deleted**  
- Lines with neither \`+\` nor \`-\` are **context** (unchanged, shown for reference)
- \`@@\` lines show line number ranges for the changes

## Summary Guidelines

### Content Rules
1. **Focus on intent, not mechanics**: Explain *what* changed and *why*, not just the technical details
2. **Group related changes**: Combine multiple small changes to the same feature into one bullet point
3. **Prioritize impact**: Lead with changes that affect functionality, then structure, then style
4. **Use present tense**: "Add", "Fix", "Update", "Remove" (not "Added", "Fixed", etc.)
5. **Be specific but concise**: Include key details like variable names, function names, or important values

### File Reference Rules
- **1-2 files**: List them explicitly \`[file1.js], [file2.ts]\`
- **3+ files**: Omit file lists or use general description \`[multiple test files]\`
- **Always use square brackets** around file references
- **Use relative paths** from repository root

### Summary Structure
- Start each bullet with an action verb (Add, Fix, Update, Remove, Refactor, etc.)
- Include the most important changes first
- Keep bullets focused on a single logical change
- Avoid redundant information between bullets

## Example Quality Summaries

**Good Examples:**
\`\`\`
* Increase API response limit from 10 to 100 recordings [api/recordings.ts], [config/constants.ts]
* Fix authentication timeout handling in user login flow [auth/login.js]
* Refactor database connection logic to use connection pooling [db/connection.ts]
* Add input validation for email addresses in registration form [components/RegisterForm.tsx]
* Remove deprecated legacy payment processing code [payments/legacy.js]
\`\`\`

**Avoid These Patterns:**
\`\`\`
* Updated file.js (too vague)
* Added 5 lines and removed 3 lines (focuses on mechanics, not purpose)
* Fixed bug (what bug? where?)
* Changed some code in the frontend (not specific enough)
* Made improvements to the codebase (meaningless)
\`\`\`

## Special Cases

**New Files**: \`Add new [filename] for [purpose]\`
**Deleted Files**: \`Remove [filename] - [brief reason]\`
**Renames/Moves**: \`Move [old-path] to [new-path]\`
**Dependencies**: \`Add [package-name] dependency for [purpose]\` or \`Update [package] to v[version]\`
**Configuration**: \`Update [config-type] configuration to [enable/disable/change] [feature]\`
**Tests**: \`Add tests for [feature]\` or \`Update test suite for [component]\`
**Documentation**: \`Update documentation for [feature/API/component]\`

## Analysis Process

1. **Scan for file types** to understand the scope (frontend, backend, config, tests, docs)
2. **Identify logical groups** of changes that belong together
3. **Determine the primary intent** of each group
4. **Prioritize by impact**: features > fixes > refactoring > style > docs
5. **Write bullets** focusing on user/developer-facing changes first

Provide only the bullet-point summary, with each point starting with \`*\` and following the guidelines above. Do not include explanatory text, headers, or meta-commentary about the diff itself.`,
    `Please summarize the following diff file: \n\n${diff}`
]);

    return await response.response.text();
}
