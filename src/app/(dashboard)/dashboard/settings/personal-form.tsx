"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// @ts-ignore
import { useCountries } from "use-react-countries";
import { cities } from "@/lib/constants/cities";
import parsePhoneNumber from "libphonenumber-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

const personalFormSchema = z.object({
  profilePic: z.string().optional(),
  firstName: z
    .string({ required_error: "First Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30),
  lastName: z
    .string({ required_error: "Last Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .refine(
      (phone) => {
        let parsed = parsePhoneNumber(phone);
        console.log("isValid", parsed?.isValid());
        if (!parsed?.isValid()) return false;
        return true;
      },
      {
        message: "Invalid phone number.",
      },
    )
    .optional(),
  dob: z.date().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  resume: z.string().optional(),
});

type PersonalFormValues = z.infer<typeof personalFormSchema>;

export function PersonalForm() {
  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "mohaelguarir@gmail.com",
    },
  });

  let { countries } = useCountries();
  function onSubmit(data: PersonalFormValues) {
    console.log("data", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profilePic"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Profile picture</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <button type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={field.value} />
                      <AvatarFallback className="bg-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-800/90 transition-colors duration-300 bg-opacity-95 text-background dark:text-foreground">
                        <Icons.uploadIcon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  <div>
                    <span className="block text-sm text-muted-foreground">
                      an image at least 256px by 256px in .jpg or .png format.
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* name */}
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your account name not your display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your primary email and cannot be changed, it will also
                to contact you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone & dob */}
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete={"false"}
                    autoCorrect="false"
                    aria-autocomplete="none"
                  />
                </FormControl>
                <FormDescription>
                  This phone number will be used to contact you when applying to
                  job offers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-10 w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="grid w-full p-0" align="start">
                    <div className="flex w-full items-center gap-2 p-4 pb-2">
                      <Select
                        defaultValue={
                          field.value ? format(field.value, "MMMM") : ""
                        }
                        onValueChange={(value) => {
                          field.onChange(
                            new Date(
                              field.value ? field.value.getFullYear() : 2000,
                              parseInt(value),
                              field.value ? field.value.getDate() : 1,
                            ),
                          );
                        }}
                      >
                        <SelectTrigger className="w-1/2">
                          <div>
                            {field.value
                              ? format(field.value, "MMMM")
                              : "Month"}
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {format(new Date(0, i), "MMMM")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* years */}
                      <Select
                        defaultValue={
                          field.value ? format(field.value, "yyyy") : ""
                        }
                        onValueChange={(value) => {
                          field.onChange(
                            new Date(
                              parseInt(value),
                              field.value ? field.value.getMonth() : 0,
                              field.value ? field.value.getDate() : 1,
                            ),
                          );
                        }}
                      >
                        <SelectTrigger className="w-1/2">
                          <SelectValue
                            placeholder={
                              field.value ? format(field.value, "yyyy") : "Year"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 100 }).map((_, i) => (
                            <SelectItem
                              key={i}
                              value={(new Date().getFullYear() - i).toString()}
                            >
                              {(new Date().getFullYear() - i).toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Calendar
                      mode="single"
                      month={field.value || new Date()}
                      onMonthChange={(month) => {
                        field.onChange(
                          new Date(
                            field.value ? field.value.getFullYear() : 2000,
                            month.getMonth(),
                            field.value ? field.value.getDate() : 1,
                          ),
                        );
                      }}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* location */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: any) => (
                        <SelectItem key={country.code} value={country.name}>
                          <div className="flex items-center gap-2">
                            <img
                              src={country.flags.png}
                              className="w-5 object-contain"
                            />
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Briefly describe yourself. This will be visible to employers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
