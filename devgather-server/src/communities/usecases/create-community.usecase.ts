import { ConflictException, Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CreateCommunityDTO } from '../dtos/create-community.dto';
import { CommunitySchema } from '../domain/community.schema';
import Community from '../domain/community';
import { Usecase } from 'src/@shared/types/usecase';

type ICreateCommunityUsecase = CreateCommunityDTO & {
  ownerId: string;
};

type OCreateCommunityUsecase = Community;

@Injectable()
export class CreateCommunityUsecase
  implements Usecase<ICreateCommunityUsecase, OCreateCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(data: ICreateCommunityUsecase): Promise<Community> {
    const community = await this.communityRepository.findByName(data.name);
    if (community) {
      throw new ConflictException('community already exists');
    }

    const createdCommunity = (await this.communityRepository.create(
      data,
    )) as CommunitySchema;
    return CommunitySchema.toDomain(createdCommunity);
  }
}
