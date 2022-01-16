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
import { EventService } from './event.service';
import {
  Event as EventModel,
  Event_Tag as EventTagModel,
  Comment as CommentModel,
  Prisma,
} from '@prisma/client';
import { query } from 'express';

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
      time: Date;
      likes: number;
      shares: number;
      share_link: string;
      participants: number;
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
      likes,
      shares,
      share_link,
      participants,
      time,
      price_estimate,
      description,
    } = eventData;
    return this.eventService.createEvent({
      event_name,
      longitude,
      time,
      participants,
      latitude,
      likes,
      shares,
      share_link,
      price_estimate,
      description,
      user: {
        connect: { id: user_id },
      },
    });
  }

  @Get()
  async filterEvents(
    @Query()
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

  @Get('/nearby-events')
  async getNearbyEventsByDistance(
    @Query()
    eventData: {
      distance: number;
      coords: {
        latitude: number;
        longitude: number;
      };
    },
  ): Promise<EventModel[]> {
    return this.eventService.getEventsWithinDistance(eventData);
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string): Promise<EventModel> {
    return this.eventService.event({ id: Number(id) });
  }

  @Get('/:id/tags')
  async getEventTags(
    @Param('id') id: string,
    @Query()
    eventData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.Event_TagWhereUniqueInput;
      where?: Prisma.Event_TagWhereInput;
      orderBy?: Prisma.Event_TagOrderByWithRelationInput;
    },
  ): Promise<EventTagModel[]> {
    return this.eventService.getEventTags({
      ...eventData,
      where: { event_id: Number(id) },
    });
  }

  @Get('/:id/comments')
  async getEventComments(
    @Param('id') id: string,
    @Query()
    eventData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CommentWhereUniqueInput;
      where?: Prisma.CommentWhereInput;
      orderBy?: Prisma.CommentOrderByWithRelationInput;
    },
  ): Promise<CommentModel[]> {
    return this.eventService.getEventComments({
      ...eventData,
      where: { event_id: Number(id) },
    });
  }

  @Put('/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body()
    eventData: {
      user_id: number;
      event_name: string;
      longitude: number;
      latitude: number;
      time: Date;
      likes: number;
      shares: number;
      share_link: string;
      participants: number;
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
