import {Body, Param, Post, Controller} from '@nestjs/common';
import {HermesGateway} from '../../gateway';
import {COMMAND} from '../../Types';

@Controller('command')
export class CommandController {
  gateway: HermesGateway;

  constructor(gateway: HermesGateway) {
    this.gateway = gateway;
  }

  @Post(':command/:target')
  async create(
    @Param('command') command: string,
    @Param('target') target: string,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<string>(COMMAND, {
      command,
      target,
      body,
    });

    return response;
  }
}
