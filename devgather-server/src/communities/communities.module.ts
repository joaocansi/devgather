import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import CommunityRepositoryImpl from './infrastructure/community.repository.impl';
import CommunityUserRepositoryImpl from './infrastructure/community-user.repository.impl';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { JoinCommunityUsecase } from './usecases/join-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { db } from 'src/@shared/db';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { ApproveCommunityUserUsecase } from './usecases/approve-community-user.usecase';
import { RejectCommunityUserUsecase } from './usecases/reject-community-user.usecase copy';

@Module({
  controllers: [CommunitiesController],
  providers: [
    CreateCommunityUsecase,
    JoinCommunityUsecase,
    GetCommunityUsecase,
    GetCommunitiesUsecase,
    ApproveCommunityUserUsecase,
    RejectCommunityUserUsecase,
    {
      provide: 'COMMUNITY_REPOSITORY',
      useFactory: () => {
        return new CommunityRepositoryImpl(db);
      },
    },
    {
      provide: 'COMMUNITY_USER_REPOSITORY',
      useFactory: () => {
        return new CommunityUserRepositoryImpl(db);
      },
    },
  ],
})
export class CommunitiesModule {}
