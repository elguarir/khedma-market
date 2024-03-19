import { OutputData } from "@editorjs/editorjs";
import { Checkbox } from "@/components/ui/checkbox";

import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";

export const BlockRenderer = ({
  block,
}: {
  block: OutputData["blocks"][0];
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          {parse(sanitizeHtml(block.data.text), {
            replace: (domNode) => {
              if (domNode.type === "tag" && domNode.name === "script") {
                return <></>;
              }
            },
          })}
        </p>
      );
    case "header":
      const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
      return <HeaderTag>{block.data.text}</HeaderTag>;
    case "list":
      if (block.data.style === "ordered") {
        return (
          <ol>
            {block.data.items.map((item: string, index: number) => (
              <li key={index}>
                {parse(sanitizeHtml(item), {
                  replace: (domNode) => {
                    if (domNode.type === "tag" && domNode.name === "script") {
                      return <></>;
                    }
                  },
                })}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul>
          {block.data.items.map((item: string, index: number) => (
            <li key={index}>
              {parse(sanitizeHtml(item), {
                replace: (domNode) => {
                  if (domNode.type === "tag" && domNode.name === "script") {
                    return <></>;
                  }
                },
              })}
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <div className="flex flex-col pl-4">
          {block.data.items.map(
            (item: { text: string; checked: boolean }, index: number) => (
              <label
                className="flex items-center gap-2 font-medium"
                key={index}
              >
                <Checkbox />
                {item.text}
              </label>
            ),
          )}
        </div>
      );
    case "delimiter":
      return <hr />;

    default:
      return null;
  }
};
