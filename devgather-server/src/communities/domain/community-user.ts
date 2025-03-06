import { CommunityUserRole } from './community-user-role.enum';
import { CommunityUserStatus } from './community-user-status.enum';

export type CommunityUser = {
  userId: string;
  communityId: string;
  role: CommunityUserRole;
  status: CommunityUserStatus;
};
