import { CommunityUserRole } from './community-user-role.enum';

export type CommunityUser = {
  userId: string;
  communityId: string;
  role: CommunityUserRole;
};
