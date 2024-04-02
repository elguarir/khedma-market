import { create } from "zustand";

type Store = {
  filters: {
    jobtype: string[];
    remote: boolean;
    city: string;
  };
  setFilters: (filters: Store["filters"]) => void;
  clearFilters: () => void;
};

export const useFilters = create<Store>()((set, get) => ({
  filters: {
    jobtype: [],
    remote: false,
    city: "",
  },
  setFilters: (filters) => set({ filters }),
  clearFilters: () =>
    set({ filters: { jobtype: [], remote: false, city: "" } }),
}));

/**
 *  <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between font-[550]">
        Search
        <Button className="p-0 text-xs font-[550]" variant={"link"}>
          Clear
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input name="q" placeholder="Eg: Data Scientist" />
        <Button className="px-3">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between font-[550]">
        Job Type
      </div>
      <div className="flex flex-col space-y-3">
        {Object.entries(job_types).map(([key, value]) => (
          <Label
            key={key}
            className="flex items-center gap-2 font-[450] tracking-normal"
          >
            <Checkbox rounded={false} id={key} name="jobtype" value={key} />{" "}
            {value}
          </Label>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between font-[550]">
        Remote Friendly
      </div>
      <div className="flex flex-col space-y-3">
        <Label className="flex items-center gap-2 font-[450] tracking-normal">
          <Switch defaultChecked={false} defaultValue={"off"} name="remote" />
          <span className="italic text-muted-foreground">Off</span>
        </Label>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between font-[550]">
        Location
      </div>
      <div className="flex flex-col space-y-3">
        <Select name="city">
          <SelectTrigger>
            <SelectValue placeholder="Anywhere" />
          </SelectTrigger>
          <SelectContent>
            {cities
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </form>
 */
