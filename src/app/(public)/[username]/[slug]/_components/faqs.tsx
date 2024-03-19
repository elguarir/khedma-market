"use client";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type Props = {
  faqs: { question: string; answer: string }[] | undefined;
};

const Faqs = ({ faqs }: Props) => {
  if (!faqs) return null;

  return (
    <Accordion.Root type="single" className="grid gap-2" collapsible>
      {faqs.map((faq, index) => (
        <Accordion.Item className="rounded-md border" value={index.toString()}>
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full flex-1 items-center justify-between rounded-md p-4 font-medium outline-none transition-all focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&[data-state=open]>svg]:rotate-180">
              {faq.question}
              <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden transition-all duration-200 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="flex flex-col space-y-2 p-4 pt-0">
              <p>{faq.answer}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default Faqs;
