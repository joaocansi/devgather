import { redirect } from "next/navigation";

import { getCommunity } from "../../_actions/get-community.action";

import CommunityNavigation from "./_components/navigation";
import { CommunityHeader } from "./_components/community-header";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: community } = await getCommunity(slug);

  if (!community) {
    redirect("/comunidades");
  }

  return (
    <section>
      <CommunityHeader community={community} />
      <div className="mt-12">
        <CommunityNavigation />
      </div>
    </section>
  );
}
