import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment as CommentModel, Prisma } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body()
    commentData: {
      user_id: number;
      event_id: number;
      text: string;
    },
  ): Promise<CommentModel> {
    const { user_id, event_id, text } = commentData;
    return this.commentService.createComment({
      text,
      event: {
        connect: { id: event_id },
      },
      user: {
        connect: { id: user_id },
      },
    });
  }

  @Get()
  async filterComments(
    @Body()
    commentData: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CommentWhereUniqueInput;
      where?: Prisma.CommentWhereInput;
      orderBy?: Prisma.CommentOrderByWithRelationInput;
    },
  ): Promise<CommentModel[]> {
    return this.commentService.comments(commentData);
  }

  @Get('/:id')
  async getComment(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.comment({ id: Number(id) });
  }

  @Put('/:id')
  async updateComment(
    @Param('id') id: string,
    @Body()
    commentData: {
      user_id: number;
      event_id: number;
      text: string;
    },
  ): Promise<CommentModel> {
    return this.commentService.updateComment({
      where: { id: Number(id) },
      data: commentData,
    });
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.deleteComment({ id: Number(id) });
  }
}
