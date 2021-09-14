import {MessageBody, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway()
export class HermesGateway {
  // constructor() {}

  @SubscribeMessage('ping')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
