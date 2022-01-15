import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body()
    userData: {
      email?: string;
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
    @Body()
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

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userData: {
      email?: string;
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
