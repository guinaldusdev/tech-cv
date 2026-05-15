import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() body: CreateProjectDto,
  ) {
    return this.projectsService.create(
      req.user.userId,
      body,
    );
  }

  @Get()
  findAll() {
    return this.projectsService.findAllPublic();
  }

  @Get('featured')
  featured() {
    return this.projectsService.findFeatured();
  }
}