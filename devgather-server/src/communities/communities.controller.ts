import { Body, Controller, Post } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDTO } from './dtos/create-community.dto';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/@shared/decorators/authenticated-user.decorator';

@Controller('communities')
export class CommunitiesController {
  constructor(private communitiesService: CommunitiesService) {}

  @Post()
  async createCommunity(
    @Body() dto: CreateCommunityDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.communitiesService.createCommunity({
      ...dto,
      ownerId: user.id,
    });
  }
}
