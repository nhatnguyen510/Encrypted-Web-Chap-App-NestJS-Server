import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/global.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { RouterModule } from '@nestjs/core';
import { FriendModule } from './friend/friend.module';
import { routes } from './routes';
import { BullModule } from '@nestjs/bullmq';
import { RedisConfig } from './config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    CommonModule,
    UserModule,
    ConversationModule,
    MessageModule,
    FriendModule,
    ChatModule,
    RouterModule.register(routes),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => ({
        connection: {
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
