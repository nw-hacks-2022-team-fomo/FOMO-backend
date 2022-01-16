import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, User_Link, Liked_Event } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getUserLinks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.User_LinkWhereUniqueInput;
    where?: Prisma.User_LinkWhereInput;
    orderBy?: Prisma.User_LinkOrderByWithRelationInput;
  }): Promise<User_Link[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user_Link.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getUserLikedEvents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.User_LinkWhereUniqueInput;
    where?: Prisma.User_LinkWhereInput;
    orderBy?: Prisma.User_LinkOrderByWithRelationInput;
  }): Promise<Liked_Event[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.liked_Event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        event: true,
      },
    });
  }
}
