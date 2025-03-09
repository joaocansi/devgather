import { CommunityUserRole } from './community-user-role.enum';
import { CommunityUserSchema } from './community-user.schema';

export type CreateCommunityUser = {
  userId: string;
  communityId: string;
  role: CommunityUserRole;
};

export type UpdateCommunityUser = Partial<CreateCommunityUser> & {
  id: string;
};

export default interface CommunityUserRepository {
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<CommunityUserSchema>;
  findByCommunityIdAndUserId(
    communityId: string,
    userId: string,
  ): Promise<CommunityUserSchema>;
  create(data: CreateCommunityUser): Promise<CommunityUserSchema>;
  update(data: UpdateCommunityUser): Promise<CommunityUserSchema>;
}
