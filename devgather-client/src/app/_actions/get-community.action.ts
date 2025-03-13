"use server";

import { ActionResponse, sessionCookies } from "./_action";
import { handleApiError } from "./_api-messager";

import { api } from "@/src/shared/clients/api-client";

export type Community = {
  id: string;
  totalMembers: number;
  tags: string[];
  name: string;
  description: string;
  image: string;
  slug: string;
  sessionUser: {
    role: string;
  };
};

export async function getCommunity(
  slug: string,
): Promise<ActionResponse<Community>> {
  const cookieHeader = await sessionCookies();

  try {
    const response = await api.get(`/communities/${slug}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    const data = response.data;

    return {
      data,
      error: null,
    };
  } catch (error) {
    const { type, message } = handleApiError(error);

    return {
      data: null,
      error: {
        message,
        type,
      },
    };
  }
}
