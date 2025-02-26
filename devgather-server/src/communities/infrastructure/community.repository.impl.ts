import { Injectable } from '@nestjs/common';
import CommunityRepository, {
  CreateCommunity,
} from '../domain/community.repository';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class CommunityRepositoryImpl implements CommunityRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  create(data: CreateCommunity): Promise<any> {
    return this.databaseClient.community.create({
      data,
    });
  }
}
