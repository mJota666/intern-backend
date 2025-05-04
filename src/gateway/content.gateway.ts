import { Module } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ContentGateway {
  @WebSocketServer() server: Server;
  notifyUpdate(content: any) {
    this.server.emit('contentUpdated', content);
  }
}

@Module({
  providers: [ContentGateway],
  exports:   [ContentGateway],
})
export class GatewayModule {}
