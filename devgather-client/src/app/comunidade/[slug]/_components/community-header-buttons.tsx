"use client";

import { addToast, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { joinCommunity } from "@/src/app/_actions/join-community.action";
import { Community } from "@/src/app/_actions/get-community.action";

type CommunityHeaderButtonsProps = {
  community: Community;
};

export function CommunityHeaderButtons({
  community,
}: CommunityHeaderButtonsProps) {
  const router = useRouter();

  const [joinLoading, setJoinLoading] = useState(false);
  const [isMember] = useState(!!community.sessionUser);

  const handleJoinButton = async () => {
    setJoinLoading(true);
    const { error } = await joinCommunity(community.id);

    setJoinLoading(false);

    if (error) {
      addToast({ title: "Erro", description: error.message, color: "danger" });

      return;
    }

    router.refresh();
    addToast({
      title: "Sucesso",
      description:
        "Agora, você faz parte da comunidade " + community.name + ".",

      color: "success",
    });
  };

  return (
    <>
      <Button
        className={`${isMember && "hidden"}`}
        color="primary"
        isLoading={joinLoading}
        onPress={handleJoinButton}
      >
        Participar
      </Button>
      <Button className={`${!isMember && "hidden"}`} color="danger">
        Sair
      </Button>
    </>
  );
}
