import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { Usecase } from 'src/@shared/types/usecase';
import Community from '../domain/community';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';

type IGetCommunityUsecase = string;
type OGetCommunityUsecase = Community;

@Injectable()
export class GetCommunityUsecase
  implements Usecase<IGetCommunityUsecase, OGetCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(communitySlug: string) {
    const community = await this.communityRepository.findBySlug(communitySlug);
    if (!community)
      throw new AppError(
        'communidade não encontrada',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );
    return CommunitySchema.toDomain(community);
  }
}
