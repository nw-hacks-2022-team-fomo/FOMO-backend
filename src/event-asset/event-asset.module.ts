import { Module } from '@nestjs/common';
import { EventAssetService } from './event-asset.service';
import { EventAssetController } from './event-asset.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EventAssetController],
  providers: [EventAssetService, PrismaService],
})
export class EventAssetModule {}
