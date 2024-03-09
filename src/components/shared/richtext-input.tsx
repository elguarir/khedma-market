"use client";

import { withProps } from "@udecode/cn";
import {
  createPlugins,
  Plate,
  PlateContent,
  PlateElement,
  PlateLeaf,
} from "@udecode/plate-common";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import {
  createListPlugin,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_LI,
} from "@udecode/plate-list";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
} from "@udecode/plate-basic-marks";
import { createFontBackgroundColorPlugin } from "@udecode/plate-font";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";

import { HrElement } from "@/components/plate-ui/hr-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { Editor } from "../plate-ui/editor";
import { FloatingToolbar } from "../plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "../plate-ui/floating-toolbar-buttons";

const plugins = createPlugins(
  [
    createHeadingPlugin(),
    createHorizontalRulePlugin(),
    createListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createFontBackgroundColorPlugin(),
    createHighlightPlugin(),
  ],
  {
    components: {
      [ELEMENT_HR]: HrElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
      [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
      [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
      [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
      [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
    },
  },
);

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export function RichTextInput() {
  return (
    <TooltipProvider>
      <div className="w-full">
        <Plate plugins={plugins}>
          <Editor placeholder="Type your message here." />
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </Plate>
      </div>
    </TooltipProvider>
  );
}
