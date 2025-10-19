import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsString } from 'class-validator';

class EventMessage {
  @IsString()
  event: string;
}

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('message')
  @UsePipes(new ValidationPipe())
  handleMessage(@MessageBody() message: EventMessage): string {
    console.log('Received message:', message);
    return `Hello world! Event: ${message.event}`;
  }
}
