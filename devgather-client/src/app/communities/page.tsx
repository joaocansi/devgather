import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold">Comunidades</h3>
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
