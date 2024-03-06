import { create } from "zustand";
import type { TOverviewStep } from "../_components/overview-step";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  overview: TOverviewStep | null;
  setOverview: (overview: TOverviewStep) => void;
};

export const useWizard = create<Store>()(
  persist(
    (set, get) => ({
      overview: null,
      setOverview: (overview) => {
        set({ overview });
      },
    }),
    {
      name: "gig-create-wizard",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
