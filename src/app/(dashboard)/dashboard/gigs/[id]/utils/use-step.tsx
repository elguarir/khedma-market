import { create } from "zustand";

type Store = {
  step: number;
  setStep: (step: number) => void;
};

export const useStep = create<Store>()((set, get) => ({
  step: 2,
  setStep: (step) => {
    set({ step });
  },
}));
