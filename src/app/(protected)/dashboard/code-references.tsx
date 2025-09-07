"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[];
};

const CodeReferences = ({ filesReferences }: Props) => {
  const firstFile = useMemo(
    () => filesReferences[0]?.fileName,
    [filesReferences],
  );
  const [tab, setTab] = useState<string | undefined>(firstFile);

  useEffect(() => {
    if (filesReferences.length) setTab(filesReferences[0]?.fileName);
  }, [filesReferences]);

  if (!filesReferences.length || !tab) return null;

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex w-full gap-2 overflow-x-auto rounded-md bg-zinc-900 p-1 text-zinc-200">
          {filesReferences.map((file) => (
            <TabsTrigger
              key={file.fileName}
              value={file.fileName}
              className="rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white data-[state=active]:bg-zinc-800"
            >
              {file.fileName}
            </TabsTrigger>
          ))}
        </TabsList>

        {filesReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-h-[40vh] w-full overflow-auto rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100"
          >
            <SyntaxHighlighter
              language="typescript"
              style={lucario}
              wrapLongLines
              customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "0.9rem",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                },
              }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;
