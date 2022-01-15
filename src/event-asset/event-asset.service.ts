import { Injectable } from '@nestjs/common';
import { Event_Asset, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EventAssetService {
  constructor(private prisma: PrismaService) {}

  async eventAsset(
    eventAssetWhereUniqueInput: Prisma.Event_AssetWhereUniqueInput,
  ): Promise<Event_Asset | null> {
    return this.prisma.event_Asset.findUnique({
      where: eventAssetWhereUniqueInput,
    });
  }

  async eventAssets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Event_AssetWhereUniqueInput;
    where?: Prisma.Event_AssetWhereInput;
    orderBy?: Prisma.Event_AssetOrderByWithRelationInput;
  }): Promise<Event_Asset[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.event_Asset.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createEventAsset(
    data: Prisma.Event_AssetCreateInput,
  ): Promise<Event_Asset> {
    return this.prisma.event_Asset.create({
      data,
    });
  }

  async updateEventAsset(params: {
    where: Prisma.Event_AssetWhereUniqueInput;
    data: Prisma.Event_AssetUpdateInput;
  }): Promise<Event_Asset> {
    const { where, data } = params;
    return this.prisma.event_Asset.update({
      data,
      where,
    });
  }

  async deleteEventAsset(
    where: Prisma.Event_AssetWhereUniqueInput,
  ): Promise<Event_Asset> {
    return this.prisma.event_Asset.delete({
      where,
    });
  }
}
