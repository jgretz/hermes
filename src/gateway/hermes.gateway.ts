import {WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Events} from '@jgretz/igor-shared';

@WebSocketGateway()
export class HermesGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  // there should only ever be one for this application
  socket: Socket | null;

  handleConnection(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    this.socket = client;
  }

  handleDisconnect() {
    this.socket = null;
  }

  send<T>(event: Events, ...args: any[]): Promise<T> {
    return new Promise((resolve) => {
      this.socket.emit(event, ...args, (response: T | PromiseLike<T>) => {
        resolve(response);
      });
    });
  }
}
