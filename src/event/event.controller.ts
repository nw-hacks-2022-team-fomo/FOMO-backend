import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event as EventModel, Prisma } from '@prisma/client';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(
    @Body()
    eventData: {
      user_id: number;
      event_name: string;
      longitude: number;
      latitude: number;
      price_estimate: number;
      description: string;
    },
  ): Promise<EventModel> {
    const {
      user_id,
      event_name,
      longitude,
      latitude,
      price_estimate,
      description,
    } = eventData;
    return this.eventService.createEvent({
      event_name,
      longitude,
      latitude,
      price_estimate,
      description,
      user: {
        connect: { id: user_id },
      },
    });
  }

  @Get()
  async filterEvents(
    @Body()
    eventData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.EventWhereUniqueInput;
      where?: Prisma.EventWhereInput;
      orderBy?: Prisma.EventOrderByWithRelationInput;
    },
  ): Promise<EventModel[]> {
    return this.eventService.events(eventData);
  }

  @Get('/:id')
  async getEventAsset(@Param('id') id: string): Promise<EventModel> {
    return this.eventService.event({ id: Number(id) });
  }

  @Put('/:id')
  async updateEventAsset(
    @Param('id') id: string,
    @Body()
    eventData: {
      user_id: number;
      event_name: string;
      longitude: number;
      latitude: number;
      price_estimate: number;
      description: string;
    },
  ): Promise<EventModel> {
    return this.eventService.updateEvent({
      where: { id: Number(id) },
      data: eventData,
    });
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: string): Promise<EventModel> {
    return this.eventService.deleteEvent({ id: Number(id) });
  }
}
