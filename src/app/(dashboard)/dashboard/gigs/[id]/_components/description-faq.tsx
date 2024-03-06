"use client";
import React from "react";
import { useStep } from "../utils/use-step";

type Props = {
  step: number;
};

const DescriptionFaq = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  if (props.step !== currentStep) return null;
  return <div>DescriptionFaq</div>;
};

export default DescriptionFaq;
