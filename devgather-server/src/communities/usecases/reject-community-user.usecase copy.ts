import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from 'src/@shared/types/usecase';
import CommunityRepository from '../domain/community.repository';
import CommunityUserRepository from '../domain/community-user.repository';

type IRejectCommunityUserUsecase = {
  requestId: string;
  userId: string;
};
type ORejectCommunityUserUsecase = void;

@Injectable()
export class RejectCommunityUserUsecase
  implements Usecase<IRejectCommunityUserUsecase, ORejectCommunityUserUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
    @Inject('COMMUNITY_USER_REPOSITORY')
    private readonly communityUserRepository: CommunityUserRepository,
  ) {}
  async execute(data: IRejectCommunityUserUsecase): Promise<void> {
    const communityUser = await this.communityUserRepository.findById(
      data.requestId,
    );

    if (!communityUser) {
      throw new NotFoundException('community user not found');
    }

    const community = await this.communityRepository.findById(
      communityUser.communityId,
    );

    if (!community || community.ownerId !== data.userId) {
      throw new NotFoundException('community user not found');
    }

    await this.communityUserRepository.deleteById(communityUser.id);
  }
}
