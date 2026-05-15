import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: CreateProfileDto) {
    return this.prisma.profile.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findPublicProfile(userId: string) {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }
}