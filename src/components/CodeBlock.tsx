import { Highlight, PrismTheme } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Custom light theme matching the screenshot colors
const customLightTheme: PrismTheme = {
  plain: {
    color: "#000000",
    backgroundColor: "#f8f8f8",
  },
  styles: [
    {
      types: ["keyword", "operator"],
      style: { color: "#d73a49" }, // Pink/magenta for keywords
    },
    {
      types: ["builtin", "class-name", "type"],
      style: { color: "#0000ff" }, // Blue for types
    },
    {
      types: ["function"],
      style: { color: "#6f42c1" }, // Purple for functions
    },
    {
      types: ["string", "char"],
      style: { color: "#0000ff" }, // Blue for strings
    },
    {
      types: ["number", "boolean"],
      style: { color: "#0000ff" }, // Blue for numbers/booleans
    },
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#008000" }, // Green for comments
    },
    {
      types: ["punctuation"],
      style: { color: "#000000" }, // Black for punctuation
    },
    {
      types: ["variable", "parameter"],
      style: { color: "#000000" }, // Black for variables
    },
    {
      types: ["attr-name"],
      style: { color: "#d73a49" }, // Pink for attributes
    },
  ],
};

const CodeBlock = ({ code, language = "java" }: CodeBlockProps) => {
  return (
    <Highlight theme={customLightTheme} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="bg-[#f8f8f8] p-4 rounded-lg overflow-x-auto text-sm border border-border"
          style={{ ...style, margin: 0 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-gray-400 select-none text-right mr-4">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
