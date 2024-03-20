import Link from "next/link";
import HeroSection from "./_components/hero";

export default async function Home() {
  return (
    <main className="flex w-full flex-col">
      <HeroSection />
      <div className="flex flex-col gap-4 px-4 py-6">
        <div className="font-medium text-muted-foreground">Trusted by</div>
        <div className="flex items-center gap-8">
          <img className="h-12" src="/images/iam.svg" alt="iam logo" />
          <img className="h-12" src="/images/orange.png" alt="orange logo" />
          <img className="h-12" src="/images/ocp.png" alt="ocp logo" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 py-10">
        <div>
          <h2 className="text-2xl font-semibold">
            Browse services by category
          </h2>
          <p className="text-sm font-[450] text-muted-foreground">
            Looking for work? <Link href={"/jobs"} className="text-primary underline hover:text-primary-dark transition-colors">Browse jobs</Link>
          </p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
