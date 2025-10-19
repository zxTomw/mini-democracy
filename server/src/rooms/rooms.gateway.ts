import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { Socket } from 'socket.io';

class JoinRoomMessage {
  @IsString()
  @IsNotEmpty()
  roomId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
}

@WebSocketGateway()
@UsePipes(new ValidationPipe())
export class RoomsGateway {
  @SubscribeMessage('join-room')
  async handleMessage(
    @MessageBody() message: JoinRoomMessage,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    console.log(`User ${message.userId} joined room ${message.roomId}`);

    await client.join(message.roomId);
    return `successfully joined room ${message.roomId}`;
  }
  @SubscribeMessage('leave-room')
  handleLeave(
    @MessageBody() message: JoinRoomMessage,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log(`User ${message.userId} left room ${message.roomId}`);
    return `successfully left room ${message.roomId}`;
  }
}
