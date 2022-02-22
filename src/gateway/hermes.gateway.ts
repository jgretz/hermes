import {WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Events, IgorResult, IgorResultType} from '@jgretz/igor-shared';

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

  send<T>(event: Events, ...args: any[]): Promise<IgorResult<T>> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve({
          type: IgorResultType.Error,
          result: 'Igor is not connected.' as unknown as T,
        });
        return;
      }

      this.socket.emit(event, ...args, (response: IgorResult<T> | PromiseLike<IgorResult<T>>) => {
        resolve(response);
      });
    });
  }
}
