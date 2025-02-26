import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from './domain/community.repository';
import { CreateCommunityDTO } from './dtos/create-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async createCommunity(data: CreateCommunityDTO & { ownerId: string }) {
    return this.communityRepository.create(data);
  }
}
