import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

type MarkdownRenderProps = {
  content: string;
};

const MarkdownRender = ({ content }: MarkdownRenderProps) => {
  if (!content || typeof content !== "string") {
    return <div className="text-neutral-700">No content to display</div>;
  }

  return (
    <div className="text-neutral-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-lg font-bold mt-4 mb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-md font-bold mt-3 mb-2" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-sm font-bold mt-3 mb-1" {...props} />
          ),
          p: ({ ...props }) => <p className="mb-2" {...props} />,
          a: ({ ...props }) => (
            <a className="text-emerald-500 hover:underline" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside ml-4" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside ml-4" {...props} />
          ),
          li: ({ ...props }) => <li className="mb-1" {...props} />,
          strong: ({ ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          em: ({ ...props }) => <em className="italic" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600 my-4"
              {...props}
            />
          ),
          code : ({
            inline,
            className,
            children,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
            [key: string]: unknown;
          }) => {
            try {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = Array.isArray(children)
                ? children.join("")
                : String(children || "");

              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {codeString.replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code
                  className="bg-neutral-100 p-1 rounded font-mono text-sm"
                  {...props}
                >
                  {codeString}
                </code>
              );
            } catch (error) {
              console.error("Error rendering code block:", error);
              return (
                <code className="bg-neutral-100 text-amber-600 p-1 rounded font-mono text-sm">
                  {children}
                </code>
              );
            }
          },
          pre: ({ ...props }) => (
            <pre
              className="bg-neutral-800 text-white p-3 rounded-md font-mono text-sm overflow-x-auto my-4"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
