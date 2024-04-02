"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { TGetGigDetails } from "@/server/api/routers/gig";
import { youcan } from "@/lib/utils";
import { useState } from "react";
import Callout from "@/components/ui/callout";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  credit_card: z.string(),
  cvv: z.string(),
  expire_date: z.string(),
  card_holder_name: z.string(),
});

/**
 * 
curl --request POST \
  --url https://youcanpay.com/sandbox/api/pay \
  --header 'Accept: application/json' \
  --header 'Content-Type: multipart/form-data' \
  --form pub_key=pub_sandbox_6829efde-f4a3-4afd-9a31-3e09e \
  --form token_id=26010885-fb7b-41eb-baf8-3420213f1ed5 \
  --form expire_date=10/24 \
  --form credit_card=4242424242424242 \
  --form cvv=000 \
  --form 'card_holder_name=John Doe' \
  --form 'payment_method[type]=credit_card'

  res: error:{
  "message": "There are invalid fields in your request, please verify your inputs and try again.",
  "fields": {
    "expire_date": [
      "exceptions.validation.expire_date.valid"
    ]
  }
}
success
{
  "success": true,
  "is_success": true,
  "message": "The payment was processed successfully",
  "code": "000",
  "transaction_id": "3b309ec1-a8d6-4000-9114-8c6d50f78ab2",
  "order_id": "12"
}
  
 */

interface PaymentFormProps {
  gig: TGetGigDetails;
  selectedPackage: "basic" | "standard" | "premium";
  tokenId: string | undefined;
}

export default function PaymentForm({
  gig,
  tokenId,
  selectedPackage,
}: PaymentFormProps) {
  let [error, setError] = useState<string | null>(null);
  let [loading, setLoading] = useState(false);
  let [success, setSuccess] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  let mainImage = gig?.attachments.images[0]?.url;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let formData = new FormData();
    formData.append("pub_key", process.env.NEXT_PUBLIC_YOUCAN_KEY!);
    formData.append("token_id", tokenId!);
    formData.append("expire_date", values.expire_date);
    formData.append("credit_card", values.credit_card);
    formData.append("cvv", values.cvv);
    formData.append("card_holder_name", values.card_holder_name);
    formData.append("payment_method[type]", "credit_card");
    try {
        setLoading(true);
      let response = await youcan.post("/pay", formData);

      if (response.status === 200) {
        console.log("success", response.data);
        setSuccess(true);
      }
      // @ts-ignore
    } catch (error: Error) {
      console.log("error", error.message);
      setError(error.response.data.message);
    } finally {
        setLoading(false)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={loading} className="space-y-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold">
              Selected package :{" "}
              <span className="font-semibold text-primary">
                {
                  {
                    basic: "Basic",
                    standard: "Standard",
                    premium: "Premium",
                  }[selectedPackage]
                }
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <img src={mainImage} className="aspect-video h-16 rounded-md" />
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{gig?.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Price: </span>
                  <span className="text-sm font-semibold text-primary">
                    MAD {gig?.packages[selectedPackage]?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="card_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the name on the card</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="credit_card"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card number</FormLabel>
                <FormControl>
                  <Input placeholder="4242 4242 4242 4242" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-x-3 md:grid-cols-2">
            <FormField
              control={form.control}
              name="expire_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="000" type="password" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && (
            <Callout variant={"danger"}>
              <ExclamationTriangleIcon className="mr-2 h-4 w-4" />
              {error}
            </Callout>
          )}
          <Button disabled={loading} loadingText="Submitting..." type="submit">
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
