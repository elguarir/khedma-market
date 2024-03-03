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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  language: z.string({
    required_error: "You need to select a language.",
  }),
  level: z.enum(["basic", "conversational", "fluent", "native_or_bilingual"]),
});

interface LanguagesFormProps {
  languages: RouterOutput["profile"]["getUserLanguages"];
}

const LanguagesForm = (props: LanguagesFormProps) => {
  // states
  let [editMode, setEditMode] = useState(false);
  let [languageEdit, setLanguageEdit] = useState(false);
  // queries & mutations
  let { mutate: addLanguage, isLoading: isAdding } =
    api.profile.addLanguage.useMutation();
  let { mutate: updateLanguage, isLoading: isUpdating } =
    api.profile.updateLanguage.useMutation();
  let { mutate: removeLanguage, isLoading: isRemoving } =
    api.profile.removeLanguage.useMutation();
  let { data: userLanguages, isLoading: userLanguagesLoading } =
    api.profile.getUserLanguages.useQuery(undefined, {
      initialData: props.languages,
    });
  let { data: languages, isLoading } = api.profile.getLanguages.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  let utils = api.useUtils();
  let refresh = () => {
    utils.profile.getUserLanguages.invalidate();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let language = languages?.find((lan) => lan.value === values.language);
    if (!language) return;
    if (languageEdit) {
      updateLanguage(
        { id: language.id, level: values.level },
        {
          onSuccess: () => {
            refresh();
          },
          onSettled: () => {
            refresh();
            form.reset({
              language: undefined,
              level: undefined,
            });
            setEditMode(false);
          },
        },
      );
      return;
    }
    addLanguage(
      { id: language.id, level: values.level },
      {
        onSuccess(data) {
          refresh();
        },
        onSettled: () => {
          refresh();
          form.reset({
            language: undefined,
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
            Languages
            <button
              onClick={() => {
                setEditMode(true);
                setLanguageEdit(false);
                form.reset({
                  language: undefined,
                  level: undefined,
                });
              }}
              className="text-sm font-normal text-primary hover:underline focus-visible:outline-none"
            >
              Add new
            </button>
          </CardTitle>
        </TooltipTrigger>
        <TooltipContent align="start" className="mb-0.5">
          <p className="w-fit font-[550]">Add languages you speak.</p>
        </TooltipContent>
      </Tooltip>
      {editMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2">
            <fieldset disabled={isAdding} className="grid gap-4">
              <FormField
                control={form.control}
                name="language"
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
                              ? languages?.find(
                                  (language) => language.value === field.value,
                                )?.name
                              : "Select language"}
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
                            placeholder="Search language..."
                            className="h-9"
                          />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px] pr-3">
                              {isLoading && (
                                <>
                                  <div className="py-6 text-center text-sm">
                                    Loading...
                                  </div>
                                </>
                              )}
                              {languages?.map((language) => (
                                <CommandItem
                                  value={language.name}
                                  key={language.value}
                                  className={cn(
                                    language.value === field.value &&
                                      "bg-primary text-primary-foreground transition-colors data-[selected]:bg-green-800/90 data-[selected]:text-primary-foreground",
                                  )}
                                  onSelect={() => {
                                    form.setValue("language", language.value);
                                  }}
                                >
                                  {language.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      language.value === field.value
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
                          <SelectValue placeholder="Language level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="conversational">
                          Conversational
                        </SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="native_or_bilingual">
                          Native/Bilingual
                        </SelectItem>
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
                      language: undefined,
                      level: undefined,
                    });
                    setEditMode(false);
                    setLanguageEdit(false);
                  }}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isAdding || isRemoving}
                  loadingText={languageEdit ? "Saving..." : "Adding..."}
                  className="w-1/2"
                  type="submit"
                >
                  {languageEdit ? "Save" : "Add"}
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      ) : userLanguages?.length === 0 ? (
        <div>
          <p className="text-sm font-normal text-muted-foreground">
            No languages added yet.
          </p>
        </div>
      ) : (
        <div className="grid w-full gap-1.5 py-2">
          {userLanguages?.map((language) => (
            <div
              key={language.value}
              className="group flex w-full items-center justify-between"
            >
              <div className="inline-flex flex-1 gap-1">
                <p className="text-sm font-normal">
                  {language.label}{" "}
                  {language?.nativeName && (
                    <span className="font-[550]">({language.nativeName})</span>
                  )}
                  {" - "}
                  <span className="text-muted-foreground">
                    {
                      {
                        basic: "Basic",
                        conversational: "Conversational",
                        fluent: "Fluent",
                        native_or_bilingual: "Native/Bilingual",
                      }[language.level]
                    }
                  </span>
                </p>
              </div>
              {/* actions */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-primary"
                  onClick={() => {
                    form.reset({
                      language: language.value,
                      level: language.level as z.infer<
                        typeof formSchema
                      >["level"],
                    });
                    setLanguageEdit(true);
                    setEditMode(true);
                  }}
                >
                  <Icons.editIcon className="h-[18px] w-[18px]" />
                </button>
                <button
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-primary"
                  onClick={() => {
                    removeLanguage(
                      { id: language.id },
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

export default LanguagesForm;
