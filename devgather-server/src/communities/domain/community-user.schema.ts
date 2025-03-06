import { CommunityUser } from './community-user';
import { CommunityUserRole } from './community-user-role.enum';
import { CommunityUserStatus } from './community-user-status.enum';
import UserSchema from 'src/users/domain/user.schema';

export class CommunityUserSchema {
  id: string;
  userId: string;
  user?: UserSchema;
  communityId: string;
  community?: CommunityUserSchema;
  role: CommunityUserRole;
  status: CommunityUserStatus;
  createdAt: Date | null;
  updatedAt: Date | null;

  static toDomain(communityUserSchema: CommunityUserSchema): CommunityUser {
    return {
      communityId: communityUserSchema.communityId,
      role: communityUserSchema.role,
      status: communityUserSchema.status,
      userId: communityUserSchema.userId,
    };
  }
}
