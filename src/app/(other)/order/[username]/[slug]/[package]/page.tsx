import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGigDetails } from "@/server/api/routers/gig";
import { notFound, redirect } from "next/navigation";
import PaymentForm from "../../../_components/payment-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { tokenizePayment } from "@/server/api/routers/order";
import { randomUUID } from "crypto";

type Props = {
  params: {
    username: string;
    slug: string;
    package: "basic" | "standard" | "premium" | undefined;
  };
};

const OrderPage = async (props: Props) => {
  if (!props.params.package) {
    return redirect(`/${props.params.username}/${props.params.slug}/`);
  }
  let gig = await getGigDetails(props.params.username, props.params.slug);
  if (!gig) return notFound();
  let orderId = randomUUID();
  if (!gig.packages[props.params.package]) {
    return redirect(`/${props.params.username}/${props.params.slug}/`);
  }
    let res = await tokenizePayment(
      gig.packages[props.params.package]?.price! * 100,
      "MAD",
      orderId.toString(),
    );
    
  return (
    <main className="container flex min-h-screen w-full items-center justify-center py-16">
      <Card className="h-full w-full max-w-xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex flex-col justify-start gap-2">
            <Button asChild className="w-fit px-0" variant={"link"}>
              <Link href={`/${props.params.username}/${props.params.slug}/`}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Go back
              </Link>
            </Button>
            Complete your order
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentForm tokenId={res?.token.id} gig={gig} selectedPackage={props.params.package} />
        </CardContent>
      </Card>
    </main>
  );
};

export default OrderPage;
