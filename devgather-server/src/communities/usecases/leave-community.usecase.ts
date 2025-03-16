import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import CommunityUserRepository from '../domain/community-user.repository';
import { Usecase } from 'src/@shared/types/usecase';
import { CommunityUser } from '../domain/community-user';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';

type ILeaveCommunityUsecase = {
  communityId: string;
  userId: string;
};

type OLeaveCommunityUsecase = CommunityUser;

@Injectable()
export class LeaveCommunityUsecase
  implements Usecase<ILeaveCommunityUsecase, OLeaveCommunityUsecase>
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
  }: ILeaveCommunityUsecase): Promise<OLeaveCommunityUsecase> {
    const community = await this.communityRepository.findById(communityId);
    if (!community)
      throw new AppError(
        'comunidade não existe',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );

    const communityUser =
      await this.communityUserRepository.findByCommunityIdAndUserId(
        communityId,
        userId,
      );

    if (!communityUser)
      throw new AppError(
        'usuário não faz parte da comunidade',
        AppErrorType.NOT_MEMBER,
      );

    await this.communityUserRepository.deleteById(
      communityUser.id,
      communityId,
    );
    return;
  }
}
