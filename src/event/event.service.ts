import { Injectable } from '@nestjs/common';
import { Prisma, Event, Event_Tag, Event_Asset, Comment } from '@prisma/client';
import { getDistance } from 'geolib';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async event(
    eventWhereUniqueInput: Prisma.EventWhereUniqueInput,
  ): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: eventWhereUniqueInput,
      include: {
        user: true,
        assets: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            text: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
  }

  async events(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
        assets: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            text: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
  }

  async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({
      data,
    });
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }): Promise<Event> {
    const { where, data } = params;
    return this.prisma.event.update({
      data,
      where,
    });
  }

  async deleteEvent(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    return this.prisma.event.delete({
      where,
    });
  }

  async getEventTags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Event_TagWhereUniqueInput;
    where?: Prisma.Event_TagWhereInput;
    orderBy?: Prisma.Event_TagOrderByWithRelationInput;
  }): Promise<Event_Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.event_Tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getEventAssets(params: {
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

  async getEventComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Event_AssetWhereUniqueInput;
    where?: Prisma.Event_AssetWhereInput;
    orderBy?: Prisma.Event_AssetOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
      },
    });
  }

  async getEventsWithinDistance(params: {
    distance: number;
    coords: { latitude: number; longitude: number };
  }): Promise<Event[]> {
    const { distance, coords } = params;
    const events: Event[] = await this.prisma.event.findMany({
      include: {
        user: true,
        assets: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            text: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    return events.filter((value, index, array) => {
      return (
        getDistance(coords, {
          latitude: value.latitude,
          longitude: value.longitude,
        }) <= distance
      );
    });
  }
}
