import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddNewFaqProps {
  onAdd: (faq: { question: string; answer: string }) => void;
  onCancel: () => void;
}

export const AddNewFaq = ({ onAdd, onCancel }: AddNewFaqProps) => {
  const [faq, setFaq] = useState({ question: "", answer: "" });
  return (
    <div className="grid gap-2">
      <Input
        placeholder="Add a Question: i.e. Do you translate to English as well?"
        value={faq.question}
        onChange={(e) => setFaq({ ...faq, question: e.target.value })}
      />
      <Textarea
        placeholder="Add an Answer: i.e. Yes, I also translate from English to Arabic."
        value={faq.answer}
        onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
      />
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            setFaq({ question: "", answer: "" });
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAdd(faq);
            setFaq({ question: "", answer: "" });
          }}
        >
          Add FAQ
        </Button>
      </div>
    </div>
  );
};
