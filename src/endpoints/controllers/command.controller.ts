import {Response} from 'express';
import {Body, Param, Post, Controller, Res} from '@nestjs/common';
import {COMMAND} from '@jgretz/igor-shared';
import {HermesGateway} from '../../gateway';
import {prepareResponse} from '../services';

@Controller('command')
export class CommandController {
  gateway: HermesGateway;

  constructor(gateway: HermesGateway) {
    this.gateway = gateway;
  }

  @Post(':command/:target')
  async create(
    @Res({passthrough: true}) res: Response,
    @Param('command') command: string,
    @Param('target') target: string,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<unknown>(COMMAND, {
      command,
      target,
      body,
    });

    return prepareResponse(res, response);
  }
}
