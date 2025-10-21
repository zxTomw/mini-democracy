import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventsModule, RoomsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
