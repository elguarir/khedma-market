"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RouterOutput } from "@/server/api/root";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  skill: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "expert"]),
});

interface SkillsFormProps {
  skills: RouterOutput["profile"]["getUserSkills"];
}

const SkillsForm = (props: SkillsFormProps) => {
  // states
  let [editMode, setEditMode] = useState(false);
  let [skillEdit, setSkillEdit] = useState(false);
  // queries & mutations
  let { mutate: addSkill, isLoading: isAdding } =
    api.profile.addSkill.useMutation();
  let { mutate: updateSkill, isLoading: isUpdating } =
    api.profile.updateSkill.useMutation();
  let { mutate: removeLanguage, isLoading: isRemoving } =
    api.profile.removeLanguage.useMutation();
  let { data: userSkills, isLoading: userSkillsLoading } =
    api.profile.getUserSkills.useQuery(undefined, {
      initialData: props.skills,
    });
  let { data: skills, isLoading } = api.profile.getSkills.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  let utils = api.useUtils();
  let refresh = () => {
    utils.profile.getUserSkills.invalidate();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let skill = skills?.find((lan) => lan.value === values.skill);
    if (!skill) return;
    if (skillEdit) {
      updateSkill(
        { id: skill.id, level: values.level },
        {
          onSuccess: () => {
            refresh();
          },
          onSettled: () => {
            refresh();
            form.reset({
              skill: undefined,
              level: undefined,
            });
            setEditMode(false);
          },
        },
      );
      return;
    }
    addSkill(
      { id: skill.id, level: values.level },
      {
        onSuccess: () => {
          refresh();
        },
        onSettled: () => {
          refresh();
          form.reset({
            skill: undefined,
            level: undefined,
          });
          setEditMode(false);
        },
      },
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardTitle className="flex w-full items-center justify-between">
            Skills
            <button
              onClick={() => {
                setEditMode(true);
                setSkillEdit(false);
                form.reset({
                  skill: undefined,
                  level: undefined,
                });
              }}
              className="text-sm font-normal text-primary hover:underline focus-visible:outline-none"
            >
              Add new
            </button>
          </CardTitle>
        </TooltipTrigger>
        <TooltipContent align="start" className="mb-0.5 max-md:hidden">
          <p className="w-fit font-[550]">
            Add your skills and level of expertise.
          </p>
        </TooltipContent>
      </Tooltip>
      {editMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2">
            <fieldset disabled={isAdding} className="grid gap-4">
              <FormField
                control={form.control}
                name="skill"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between font-normal hover:bg-background dark:bg-transparent dark:hover:bg-transparent",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? skills?.find(
                                  (skill) => skill.value === field.value,
                                )?.name
                              : "Select skill"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        sideOffset={4}
                        side="bottom"
                        align="start"
                        className="w-full p-0 xl:w-[calc(100%+30px)] 2xl:w-[calc(100%+60px)]"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search skill..."
                            className="h-9"
                          />
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px] pr-3">
                              {isLoading && (
                                <>
                                  <div className="py-6 text-center text-sm">
                                    Loading...
                                  </div>
                                </>
                              )}
                              {skills?.map((skill) => (
                                <CommandItem
                                  value={skill.value}
                                  key={skill.value}
                                  className={cn(
                                    skill.value === field.value &&
                                      "bg-primary text-primary-foreground transition-colors data-[selected]:bg-green-800/90 data-[selected]:text-primary-foreground",
                                  )}
                                  onSelect={() => {
                                    form.setValue("skill", skill.value);
                                  }}
                                >
                                  {skill.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      skill.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                              <ScrollBar
                                size="default"
                                orientation="vertical"
                              />
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-2">
                <Button
                  className="w-1/2"
                  onClick={() => {
                    form.reset({
                      skill: undefined,
                      level: undefined,
                    });
                    setEditMode(false);
                    setSkillEdit(false);
                  }}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isAdding || isUpdating}
                  loadingText={skillEdit ? "Saving..." : "Adding..."}
                  className="w-1/2"
                  type="submit"
                >
                  {skillEdit ? "Save" : "Add"}
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      ) : userSkills?.length === 0 ? (
        <div>
          <p className="text-sm font-normal text-muted-foreground">
            No skills added yet.
          </p>
        </div>
      ) : (
        <div className="grid w-full gap-1.5 py-2">
          {userSkills?.map((skill) => (
            <div
              key={skill.value}
              className="group flex w-full items-center justify-between"
            >
              <div className="inline-flex flex-1 gap-1">
                <p className="text-sm font-normal">
                  {skill.label}
                  <span className="text-muted-foreground"></span>
                </p>
              </div>
              {/* actions */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-primary"
                  onClick={() => {
                    form.reset({
                      skill: skill.value,
                      level: skill.level as z.infer<typeof formSchema>["level"],
                    });
                    setSkillEdit(true);
                    setEditMode(true);
                  }}
                >
                  <Icons.editIcon className="h-[18px] w-[18px]" />
                </button>
                <button
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-primary"
                  onClick={() => {
                    removeLanguage(
                      { id: skill.id },
                      {
                        onSuccess() {
                          refresh();
                        },
                      },
                    );
                  }}
                >
                  <Icons.trash className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SkillsForm;
