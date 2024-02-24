"use client";
import React, { useEffect, useState } from "react";
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  getActiveFormattingMask,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { Input, InputProps } from "./input";
import { ChevronDown, Flag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";

export interface PhoneInputProps
  extends Omit<InputProps, "value" | "onChange"> {
  countrySearch?: boolean;
  value?: string | undefined;
  onChange?: (phone: string | undefined) => void;
}
const PhoneInput = ({
  countrySearch = false,
  value,
  onChange,
  ...rest
}: PhoneInputProps) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "ma",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        console.log("phone", data.phone);
        if (onChange) onChange(data.phone);
        const mask = getActiveFormattingMask({ phone: data.phone, country });
      },
    });

  return (
    <div className="relative h-10">
      {/* <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" /> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"icon"}
            variant={"secondary"}
            role="combobox"
            className={cn(
              "absolute left-2.5 top-2 h-[calc(100%-16px)] w-10 justify-between rounded-[2px] pl-[6px] pr-[3px]",
            )}
          >
            <FlagImage iso2={country.iso2 as CountryIso2} className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="-ml-2 mt-4 w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search countries..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px] pr-3">
                {defaultCountries.map((c) => {
                  const item = parseCountry(c);
                  return (
                    <CommandItem
                      className={cn(
                        "flex items-center justify-between",
                        country.name === item.name &&
                          "bg-primary text-primary-foreground transition-colors data-[selected]:bg-green-800/90 data-[selected]:text-primary-foreground",
                      )}
                      key={item.name}
                      onSelect={(v) => {
                        setCountry(item.iso2);
                      }}
                      value={item.name}
                    >

                      <div className="flex items-center text-sm">
                        <FlagImage iso2={item.iso2} className="mr-2 h-4 w-4" />
                        {item.name}
                      </div>

                      <div
                        className={cn(
                          "text-sm text-muted-foreground",
                          country.name === item.name
                            ? "text-primary-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        +{item.dialCode}
                      </div>

                    </CommandItem>
                  );
                })}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        ref={inputRef}
        type="tel"
        value={inputValue}
        onChange={handlePhoneValueChange}
        className="h-10 w-full appearance-none bg-white pl-14 shadow-none dark:bg-neutral-950 md:w-2/3 lg:w-1/3"
        {...rest}
      />
    </div>
  );
};

export default PhoneInput;
