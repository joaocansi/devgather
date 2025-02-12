import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Code } from "@heroui/code";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import Link from "next/link";

const cardData = [
  {
    imageSrc: "/1.png",
    title: "Build your profile.",
    description:
      "Set up your account, showcase your skills, and start connecting with devs.",
  },
  {
    imageSrc: "/3.png",
    title: "Join communities.",
    description:
      "Connect with developers who share your interests and tech stack.",
  },
  {
    imageSrc: "/2.png",
    title: "Collaborate on projects.",
    description:
      "Find or start projects and work with others to improve your skills.",
  },
];

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
        <h3 className="text-3xl font-bold mb-8">How it works?</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {cardData.map((card, index) => (
            <Card
              key={card.title + index}
              fullWidth
              className="transition-transform hover:-translate-y-1 p-3 cursor-pointer"
            >
              <Image
                removeWrapper
                className="rounded-xl h-40 object-cover"
                src={card.imageSrc}
              />
              <h4 className="text-xl font-bold mt-2">{card.title}</h4>
              <p>{card.description}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <Divider />
        <h3 className="text-3xl font-bold mb-8">Our stats</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center" />
      </section>
      {/* <p className="text-lg">
        We are an open-source project, and we believe in the power of
        collaboration. Whether you're a developer, designer, or just passionate
        about tech, your contributions are valuable in shaping the future of our
        platform.
      </p>
      <p className="text-lg">
        Feel free to add new features, fix bugs, improve documentation, or share
        your ideas. Every contribution, big or small, makes a difference.
      </p>
      <p className="text-lg">
        Check out our GitHub repository, explore open issues, and start
        collaborating today!
      </p>
      <Button className="w-48">
        <GithubIcon /> Open Repository
      </Button> */}
    </>
  );
}
