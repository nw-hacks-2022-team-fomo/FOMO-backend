import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { EventAssetModule } from './event-asset/event-asset.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, EventModule, EventAssetModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
