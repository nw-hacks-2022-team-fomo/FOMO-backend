import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  Prisma,
  User as UserModel,
  Liked_Event as LikedEventModel,
  User_Link as UserLinkModel,
} from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body()
    userData: {
      email?: string;
      age: number;
      gender: string;
      phone_number?: string;
      first_name: string;
      middle_name?: string;
      last_name: string;
      bio: string;
      longitude: number;
      latitude: number;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  async filterUsers(
    @Query()
    userAssetData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ): Promise<UserModel[]> {
    return this.userService.users(userAssetData);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('/:id/likes')
  async getUserLikedEvents(
    @Param('id') id: string,
    @Query()
    userData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.Liked_EventWhereUniqueInput;
      where?: Prisma.Liked_EventWhereInput;
      orderBy?: Prisma.Liked_EventOrderByWithRelationInput;
    },
  ): Promise<LikedEventModel[]> {
    return this.userService.getUserLikedEvents({
      ...userData,
      where: { user_id: Number(id) },
    });
  }

  @Get('/:id/links')
  async getUserLinks(
    @Param('id') id: string,
    @Query()
    userData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.User_LinkWhereUniqueInput;
      where?: Prisma.User_LinkWhereInput;
      orderBy?: Prisma.User_LinkOrderByWithRelationInput;
    },
  ): Promise<UserLinkModel[]> {
    return this.userService.getUserLinks({
      ...userData,
      where: { user_id: Number(id) },
    });
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userData: {
      email?: string;
      age: number;
      gender: string;
      phone_number?: string;
      first_name: string;
      middle_name?: string;
      last_name: string;
      bio: string;
      longitude: number;
      latitude: number;
    },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
