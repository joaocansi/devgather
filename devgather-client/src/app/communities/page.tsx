import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-extrabold">
            Join a <span className="text-primary">Tech Community</span>.
          </h2>
          <p>
            Connect with developers, share knowledge, and grow together in a
            network of innovators.
          </p>
          <Divider />
          <div className="grid grid-cols-3 gap-2">
            <Input />
            <Input />
            <Input />
          </div>
        </div>
      </section>
    </>
  );
}
