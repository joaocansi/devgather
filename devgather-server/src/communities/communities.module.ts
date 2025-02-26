import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import CommunityRepositoryImpl from './infrastructure/community.repository.impl';
import { prisma } from 'src/@shared/db';

@Module({
  controllers: [CommunitiesController],
  providers: [
    CommunitiesService,
    {
      provide: 'COMMUNITY_REPOSITORY',
      useFactory: () => {
        return new CommunityRepositoryImpl(prisma);
      },
    },
  ],
})
export class CommunitiesModule {}
