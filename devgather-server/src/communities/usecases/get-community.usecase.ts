import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { Usecase } from 'src/@shared/types/usecase';
import Community from '../domain/community';

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

  async execute(communityId: string) {
    const community = await this.communityRepository.findById(communityId);
    if (!community) throw new NotFoundException('community not found');
    return CommunitySchema.toDomain(community);
  }
}
