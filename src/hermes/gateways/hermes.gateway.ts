import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

@WebSocketGateway()
export class HermesGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  // there should only ever be one for this application
  socket: Socket | null;

  @SubscribeMessage('ping')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  handleConnection(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    this.socket = client;
  }

  handleDisconnect() {
    this.socket = null;
  }

  send<T>(event: string, ...args: any[]): Promise<T> {
    return new Promise((resolve) => {
      this.socket.emit(event, ...args, (response: T | PromiseLike<T>) => {
        resolve(response);
      });
    });
  }
}
