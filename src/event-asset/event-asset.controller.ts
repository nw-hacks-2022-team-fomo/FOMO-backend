import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventAssetService } from './event-asset.service';
import { Event_Asset as EventAssetModel, Prisma } from '@prisma/client';

@Controller('event-asset')
export class EventAssetController {
  constructor(private readonly eventAssetService: EventAssetService) {}

  @Post()
  async createEventAsset(
    @Body()
    eventAssetData: {
      event_id: number;
      name: string;
    },
  ): Promise<EventAssetModel> {
    const { event_id, name } = eventAssetData;
    return this.eventAssetService.createEventAsset({
      name,
      event: {
        connect: { id: event_id },
      },
    });
  }

  @Get()
  async filterEventAssets(
    @Body()
    eventAssetData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.Event_AssetWhereUniqueInput;
      where?: Prisma.Event_AssetWhereInput;
      orderBy?: Prisma.Event_AssetOrderByWithRelationInput;
    },
  ): Promise<EventAssetModel[]> {
    return this.eventAssetService.eventAssets(eventAssetData);
  }

  @Get('/:id')
  async getEventAsset(@Param('id') id: string): Promise<EventAssetModel> {
    return this.eventAssetService.eventAsset({ id: Number(id) });
  }

  @Put('/:id')
  async updateEventAsset(
    @Param('id') id: string,
    @Body()
    eventAssetData: {
      event_id: number;
      name: string;
    },
  ): Promise<EventAssetModel> {
    return this.eventAssetService.updateEventAsset({
      where: { id: Number(id) },
      data: eventAssetData,
    });
  }

  @Delete('/:id')
  async deleteEventAsset(@Param('id') id: string): Promise<EventAssetModel> {
    return this.eventAssetService.deleteEventAsset({ id: Number(id) });
  }
}
