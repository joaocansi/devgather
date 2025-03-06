import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCommunityDTO } from './dtos/create-community.dto';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/@shared/decorators/authenticated-user.decorator';
import { AuthGuard } from 'src/@shared/guards/auth.guard';
import { GetCommunitiesDTO } from './dtos/get-communities.dto';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { JoinCommunityUsecase } from './usecases/join-community.usecase';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { ApproveCommunityUserUsecase } from './usecases/approve-community-user.usecase';
import { RejectCommunityUserUsecase } from './usecases/reject-community-user.usecase copy';

@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly createCommunityUsecase: CreateCommunityUsecase,
    private readonly getCommunityUsecase: GetCommunityUsecase,
    private readonly getCommunitiesUsecase: GetCommunitiesUsecase,
    private readonly joinCommunityUsecase: JoinCommunityUsecase,
    private readonly approveCommunityUserUsecase: ApproveCommunityUserUsecase,
    private readonly rejectCommunityUserUsecase: RejectCommunityUserUsecase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCommunity(
    @Body() dto: CreateCommunityDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.createCommunityUsecase.execute({
      ...dto,
      ownerId: user.id,
    });
  }

  @Get()
  async getCommunities(@Query() query: GetCommunitiesDTO) {
    return this.getCommunitiesUsecase.execute(query);
  }

  @Get('/:communityId')
  async getCommunity(@Param('communityId') communityId: string) {
    return this.getCommunityUsecase.execute(communityId);
  }

  @UseGuards(AuthGuard)
  @Post('/:communityId/join')
  async joinCommunity(
    @Param('communityId') communityId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.joinCommunityUsecase.execute({ communityId, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Post('/:communityId/join-request/:requestId/approve')
  async approveCommunityUser(
    @Param('requestId') requestId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.approveCommunityUserUsecase.execute({
      requestId,
      userId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/:communityId/join-request/:requestId/reject')
  async rejectCommunityUser(
    @Param('requestId') requestId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.rejectCommunityUserUsecase.execute({
      requestId,
      userId: user.id,
    });
  }
}
