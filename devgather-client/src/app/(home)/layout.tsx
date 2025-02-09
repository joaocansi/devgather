import { Link } from "@heroui/link";
import { headers } from "next/headers";

import Navbar from "@/src/components/navbar";
import { authClient } from "@/src/lib/auth-client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return (
    <>
      <Navbar session={session.data} />
      <main className="container mx-auto max-w-5xl pt-8 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com?utm_source=next-app-template"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">HeroUI</p>
        </Link>
      </footer>
    </>
  );
}
