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
import { NonRestrictedAuthGuard } from 'src/@shared/guards/non-restricted-auth.guard';

@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly createCommunityUsecase: CreateCommunityUsecase,
    private readonly getCommunityUsecase: GetCommunityUsecase,
    private readonly getCommunitiesUsecase: GetCommunitiesUsecase,
    private readonly joinCommunityUsecase: JoinCommunityUsecase,
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

  @UseGuards(NonRestrictedAuthGuard)
  @Get()
  async getCommunities(@Query() query: GetCommunitiesDTO) {
    return this.getCommunitiesUsecase.execute(query);
  }

  @Get('/:communitySlug')
  async getCommunity(@Param('communitySlug') communitySlug: string) {
    return this.getCommunityUsecase.execute(communitySlug);
  }

  @UseGuards(AuthGuard)
  @Post('/:communityId/join')
  async joinCommunity(
    @Param('communityId') communityId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.joinCommunityUsecase.execute({ communityId, userId: user.id });
  }
}
