import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { CommunityHeader } from "../_components/community-header";
import { CommunityNavigation } from "../_components/community-navigation";

import { authClient } from "@/src/shared/clients/auth-client";
import Navbar from "@/src/shared/components/navbar";
import { SessionProvider } from "@/src/shared/hooks/session.hook";
import { CommunityProvider } from "@/src/shared/hooks/community.hook";
import { getCommunity } from "@/src/app/_actions/get-community.action";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const { slug } = await params;
  const { data: community } = await getCommunity(slug);

  if (
    !session.data ||
    !community ||
    (community.owner.id !== session.data.user.id &&
      community.sessionUser.role !== "ADMIN")
  ) {
    redirect("/");
  }

  return (
    <>
      <Navbar activePage="" session={session.data} />
      <SessionProvider user={session.data.user}>
        <CommunityProvider community={community}>
          <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
            <section className="grid grid-cols-7 gap-10">
              <div className="col-span-2 max-lg:col-span-7">
                <CommunityHeader />
              </div>
              <div className="col-span-5 max-lg:col-span-7">
                <CommunityNavigation />
              </div>
            </section>
          </main>
        </CommunityProvider>
      </SessionProvider>
    </>
  );
}
