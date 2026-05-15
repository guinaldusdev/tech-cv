import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';

import { CreateProfileDto } from './dto/create-profile.dto';

import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() body: CreateProfileDto,
  ) {
    return this.profileService.create(
      req.user.userId,
      body,
    );
  }

  @Get(':userId')
  getPublicProfile(
    @Param('userId') userId: string,
  ) {
    return this.profileService.findPublicProfile(
      userId,
    );
  }
}