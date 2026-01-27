import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import Prism from "prismjs";

// Add Java language support
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Custom light theme matching the screenshot - colorful syntax highlighting
const customLightTheme: PrismTheme = {
  plain: {
    color: "#24292f",
    backgroundColor: "#f6f8fa",
  },
  styles: [
    {
      types: ["keyword", "control-flow"],
      style: { color: "#cf222e", fontWeight: "bold" }, // Red for keywords (public, class, int, for, if, return, new)
    },
    {
      types: ["class-name", "maybe-class-name", "namespace"],
      style: { color: "#8250df" }, // Purple for class names
    },
    {
      types: ["builtin", "type-annotation"],
      style: { color: "#0550ae" }, // Blue for types
    },
    {
      types: ["function", "method"],
      style: { color: "#8250df" }, // Purple for function names
    },
    {
      types: ["string", "char", "attr-value"],
      style: { color: "#0a3069" }, // Dark blue for strings
    },
    {
      types: ["number"],
      style: { color: "#0550ae" }, // Blue for numbers
    },
    {
      types: ["boolean"],
      style: { color: "#cf222e" }, // Red for booleans
    },
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#57606a", fontStyle: "italic" }, // Gray italic for comments
    },
    {
      types: ["punctuation", "bracket"],
      style: { color: "#24292f" }, // Black for punctuation
    },
    {
      types: ["operator"],
      style: { color: "#cf222e" }, // Red for operators
    },
    {
      types: ["variable", "parameter", "property"],
      style: { color: "#953800" }, // Orange/brown for variables
    },
    {
      types: ["constant"],
      style: { color: "#0550ae" }, // Blue for constants
    },
    {
      types: ["tag"],
      style: { color: "#116329" }, // Green for tags
    },
    {
      types: ["attr-name"],
      style: { color: "#0550ae" }, // Blue for attribute names
    },
  ],
};

const CodeBlock = ({ code, language = "java" }: CodeBlockProps) => {
  return (
    <Highlight 
      theme={customLightTheme} 
      code={code.trim()} 
      language={language as any}
      prism={Prism as any}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="p-4 rounded-lg overflow-x-auto text-sm border border-border font-mono leading-relaxed"
          style={{ ...style, margin: 0 }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-muted-foreground select-none text-right mr-4 text-xs">
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