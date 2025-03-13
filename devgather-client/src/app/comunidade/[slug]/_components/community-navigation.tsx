import { EventsTab } from "./tabs/community-events-tab";
import { ProjectsTab } from "./tabs/community-projects-tab";
import { SocialMediaTab } from "./tabs/social-media-tab";

import { Tabs } from "@/src/shared/components/tabs";

type CommunityNavigationProps = {
  isMember: boolean;
};

export function CommunityNavigation({ isMember }: CommunityNavigationProps) {
  return (
    <Tabs
      tabs={[
        { title: "Eventos", key: "eventos", children: <EventsTab /> },
        {
          title: "Redes Sociais",
          key: "socialmedia",
          children: <SocialMediaTab />,
        },
        {
          title: "Projetos",
          key: "projetos",
          children: <ProjectsTab />,
          isLocked: !isMember,
        },
        {
          title: "Discussões",
          key: "discussoes",
          children: <ProjectsTab />,
          isLocked: !isMember,
        },
      ]}
    />
  );
}
