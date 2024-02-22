"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import {
  generateVerificationToken,
  newVerification,
} from "@/actions/new-verification";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import Callout from "../ui/callout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatDistanceStrict } from "date-fns";
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | undefined>();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onSubmit = useCallback(async () => {
    if (success || error) {
      setIsLoading(false);
      return;
    }

    if (!token) {
      setError("Missing token!");
      setIsLoading(false);
      return;
    }
    try {
      const data = await newVerification(token);
      if (success) {
        // Another success state is already set, do not update other states
        setIsLoading(false);
        return;
      }
      
      if (isMounted) {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
          if (data.email) setEmail(data.email);
        }
        setIsLoading(false);
      }
    } catch (error) {
      if (isMounted) {
        setError("Something went wrong!");
        setIsLoading(false);
      }
    }
  }, [token, success, error, isMounted]);

  const resendVerification = useCallback(async () => {
    if (!email) {
      setError("Missing email!");
      return;
    }
    startTransition(() => {
      setError(undefined);
      generateVerificationToken(email)
        .then((data) => {
          let expires = new Date(data.expires).getTime();
          let formattedTime = formatDistanceStrict(expires, new Date(), {
            unit: "minute",
          });
          setSuccess(
            `Verification email sent to ${email}! Token is valid for ${formattedTime}`,
          );
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  }, [token, email]);

  useEffect(() => {
    console.log("token", token);
    console.log("email", email);
    console.log("error", error);
    console.log("success", success);
  }, [token, email, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
        <Card className="flex flex-col space-y-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              Confirming your verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <Callout className="flex items-center gap-2 py-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Verifying email...</p>
              </Callout>
            )}
            {success && (
              <div className="flex w-full flex-col gap-4">
                <Callout
                  className="flex items-center gap-2 py-3"
                  variant={"success"}
                >
                  <CheckCircledIcon className="h-5 w-5" />
                  <p>{success}</p>
                </Callout>
                <Button asChild>
                  <Link href={"/auth/sign-in"}>
                    Go to sign in
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
            {error && (
              <div className="flex w-full flex-col gap-4">
                <Callout
                  className="flex items-center gap-2 py-3"
                  variant={"danger"}
                >
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <p>{error}</p>
                </Callout>
                {error === "Token has expired!" && (
                  <Button
                    isLoading={isPending}
                    loadingText="Resending..."
                    onClick={resendVerification}
                  >
                    Resend verification
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
