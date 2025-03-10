import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import CommunityUserRepository, {
  CreateCommunityUser,
  UpdateCommunityUser,
} from '../domain/community-user.repository';
import { CommunityUserSchema } from '../domain/community-user.schema';

@Injectable()
export default class CommunityUserRepositoryImpl
  implements CommunityUserRepository
{
  constructor(private readonly db: PrismaClient) {}

  async deleteById(id: string): Promise<void> {
    await this.db.communityUser.delete({ where: { id } });
  }

  findByCommunityIdAndUserId(
    communityId: string,
    userId: string,
  ): Promise<CommunityUserSchema> {
    return this.db.communityUser.findFirst({
      where: {
        communityId,
        userId,
      },
    });
  }

  findById(id: string): Promise<CommunityUserSchema> {
    return this.db.communityUser.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateCommunityUser): Promise<CommunityUserSchema> {
    const [communityUser] = await this.db.$transaction([
      this.db.communityUser.create({
        data,
      }),
      this.db.community.update({
        where: {
          id: data.communityId,
        },
        data: {
          totalMembers: {
            increment: 1,
          },
        },
      }),
    ]);
    return communityUser;
  }

  update({ id, ...data }: UpdateCommunityUser): Promise<CommunityUserSchema> {
    return this.db.communityUser.update({
      where: { id },
      data,
    });
  }
}
