import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(
    userId: string,
    data: CreateProjectDto,
  ) {
    return this.prisma.project.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findAllPublic() {
    return this.prisma.project.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findFeatured() {
    return this.prisma.project.findMany({
      where: {
        featured: true,
      },

      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }
}