"use client";
import { cn } from "@/lib/utils";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
interface EditorProps {
  value?: OutputData;
  onChange?: (data: OutputData) => void;
}

export default function RichTextInput({ value, onChange }: EditorProps) {
  let [isMounted, setIsMounted] = useState<boolean>(false);
  let ref = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header" as any)).default;
    const List = (await import("@editorjs/list" as any)).default;
    const Checklist = (await import("@editorjs/checklist" as any)).default;
    const InlineCode = (await import("@editorjs/inline-code" as any)).default;
    const Delimiter = (await import("@editorjs/delimiter" as any)).default;
    const Highlight = (await import("@editorjs/marker" as any)).default;
    const StrikeThrough = (await import("@sotaproject/strikethrough" as any))
      .default;
    if (!ref.current) {
      const editor: EditorJS = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        data: value,
        onChange: async () => {
          const savedData = await editor.save();
          console.log("savedData", savedData);
          onChange && onChange(savedData);
        },

        placeholder: "Type your page content here...",
        inlineToolbar: true,
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: List,
          checklist: Checklist,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          marker: Highlight,
          strikethrough: StrikeThrough,
        },
      });
    }
  }, []);

  // isMounted is used to prevent SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // Initialize editor
  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <div className="prose dark:prose-neutral dark:prose-invert mx-auto md:max-w-[calc(100vw-150px)] w-full space-y-2 pb-0 2xl:max-w-[calc(100vw-400px)]">
      <div
        id="editor"
        className={cn(
          "flex w-full max-w-full  flex-col items-start justify-start rounded-lg  border p-4 !pb-0 md:px-16",
        )}
      />
    </div>
  );
}
