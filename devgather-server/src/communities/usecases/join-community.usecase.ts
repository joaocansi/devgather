import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import CommunityUserRepository from '../domain/community-user.repository';
import { Usecase } from 'src/@shared/types/usecase';
import { CommunityUserSchema } from '../domain/community-user.schema';
import { CommunityUser } from '../domain/community-user';

type IJoinCommunityUsecase = {
  communityId: string;
  userId: string;
};

type OJoinCommunityUsecase = CommunityUser;

@Injectable()
export class JoinCommunityUsecase
  implements Usecase<IJoinCommunityUsecase, OJoinCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
    @Inject('COMMUNITY_USER_REPOSITORY')
    private readonly communityUserRepository: CommunityUserRepository,
  ) {}

  async execute({
    communityId,
    userId,
  }: IJoinCommunityUsecase): Promise<OJoinCommunityUsecase> {
    const community = await this.communityRepository.findById(communityId);
    if (!community) throw new NotFoundException('community not found');

    if (community.ownerId === userId)
      throw new ConflictException('owner must not join his own community');

    const joinRequest =
      await this.communityUserRepository.findByCommunityIdAndUserId(
        communityId,
        userId,
      );

    if (joinRequest)
      throw new ConflictException('join request already accepted or declined');

    const communityUser = await this.communityUserRepository.create({
      communityId,
      userId,
      role: 'DEFAULT',
      status: 'PENDING',
    });

    return CommunityUserSchema.toDomain(communityUser);
  }
}
