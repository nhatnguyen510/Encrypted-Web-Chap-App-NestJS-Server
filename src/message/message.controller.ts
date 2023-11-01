import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto, GetMessagesDto, SeenMessageDto } from './dto';
import { MessageGuard } from './guard/message.guard';
import { GetCurrentUser } from 'src/auth/decorator';

@UseGuards(MessageGuard)
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(
    @GetCurrentUser('id') id: string,
    @Param('id') conversationId: string,
    @Body('message') message: string,
  ) {
    const createMessageDto: CreateMessageDto = {
      sender_id: id,
      conversation_id: conversationId,
      message,
    };
    return this.messageService.createMessage(createMessageDto);
  }

  @Get()
  getMessages(
    @GetCurrentUser('id') user_id: string,
    @Param('id') conversation_id: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const getMessagesDto: GetMessagesDto = {
      user_id,
      conversation_id,
      page,
      limit,
    };
    return this.messageService.getMessages(getMessagesDto);
  }

  @Post('/seen')
  seen(
    @GetCurrentUser('id') user_id: string,
    @Param('id') conversation_id: string,
  ) {
    const seenMessageDto: SeenMessageDto = {
      user_id,
      conversation_id,
    };
    return this.messageService.seenMessage(seenMessageDto);
  }
}
