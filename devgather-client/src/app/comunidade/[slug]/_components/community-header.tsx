/* eslint-disable padding-line-between-statements */
"use client";

import { useState } from "react";
import { addToast, Avatar, Button, Chip } from "@heroui/react";

import { Community } from "@/src/app/_actions/get-community.action";
import { joinCommunity } from "@/src/app/_actions/join-community.action";

type CommunityHeaderProps = {
  community: Community;
};

export function CommunityHeader({ community }: CommunityHeaderProps) {
  const renderTagChip = (tag: string) => {
    return <Chip key={`page-${community.slug}-tag-${tag}`}>{tag}</Chip>;
  };

  const [joinLoading, setJoinLoading] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const handleJoinButton = async () => {
    setJoinLoading(true);
    const { error } = await joinCommunity(community.id);
    setJoinLoading(false);

    if (error) {
      addToast({ title: "Erro", description: error.message, color: "danger" });
      return;
    }

    addToast({
      title: "Sucesso",
      description:
        "Agora, você faz parte da comunidade " + community.name + ".",

      color: "success",
    });
  };

  return (
    <div className="flex gap-8 items-center flex-wrap">
      <Avatar isBordered className="min-w-52 min-h-52" src={community.image} />
      <div className="flex gap-2 flex-col">
        <h2 className="text-4xl font-black">{community.name}</h2>
        <div className="flex gap-1 flex-wrap">
          <Chip color="primary">{community.totalMembers} Membros</Chip>
          {community.tags.map(renderTagChip)}
        </div>
        <p>{community.description}</p>
        <div className="flex gap-2">
          <Button
            color="primary"
            isLoading={joinLoading}
            onPress={handleJoinButton}
          >
            Participar
          </Button>
        </div>
      </div>
    </div>
  );
}
