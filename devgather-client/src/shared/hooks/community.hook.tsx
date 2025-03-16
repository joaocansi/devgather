"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { useSession } from "./session.hook";

import {
  Community,
  getCommunity,
} from "@/src/app/_actions/get-community.action";

type CommunityContext = {
  refreshCommunity: () => Promise<void>;
  community: Community;
  userRole: "ADMIN" | "OWNER" | "DEFAULT" | "";
};

type CommunityProviderProps = {
  children: ReactNode;
  community: Community;
};

const CommunityContext = createContext({} as CommunityContext);

export const CommunityProvider = ({
  children,
  community,
}: CommunityProviderProps) => {
  const [communityState, setCommunityState] = useState(community);
  const { user } = useSession();

  const role = !user
    ? ""
    : communityState.owner.id === user.id
      ? "OWNER"
      : communityState.sessionUser
        ? communityState.sessionUser.role
        : "";

  const refreshCommunity = async () => {
    const { data } = await getCommunity(communityState.slug);

    if (data) setCommunityState(data);
  };

  return (
    <CommunityContext.Provider
      value={{
        community: communityState,
        userRole: role,
        refreshCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);
