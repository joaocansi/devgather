import { Button } from "@heroui/button";
import { Code } from "@heroui/code";
import { Divider } from "@heroui/divider";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <div className="max-w-2xl flex flex-col gap-2">
          <h3 className="text-5xl font-bold">
            Connect with{" "}
            <Code className="text-5xl" color="primary">
              developers
            </Code>{" "}
            around the world
            <span className="text-primary">.</span>
          </h3>
          <p>
            Meet developers who share your passion for programming, collaborate
            on exciting projects, and expand your network.
          </p>
          <Button
            as={Link}
            className="max-w-28"
            color="primary"
            href="/sign-up"
          >
            Start now
          </Button>
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <Divider />
        <h3 className="text-3xl font-bold">How it works?</h3>
        <div />
      </section>
    </>
  );
}
