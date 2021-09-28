import {Body, Param, Get, Post, Put, Delete, Controller, Query} from '@nestjs/common';
import {HermesGateway} from '../../hermes';
import {SocketEvents} from '../../Types';
import {DataEvents} from '../Types';

@Controller('data')
export class DataController {
  gateway: HermesGateway;

  constructor(gateway: HermesGateway) {
    this.gateway = gateway;
  }

  @Get(':source/:resource')
  async find(
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Query() query: string,
  ): Promise<string> {
    const response = await this.gateway.send<string>(SocketEvents.Data, {
      type: DataEvents.Find,
      source,
      resource,
      query,
    });

    return response;
  }

  @Get(':source/:resource/:id')
  async findOne(
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
  ) {
    const response = await this.gateway.send<string>(SocketEvents.Data, {
      type: DataEvents.FindOne,
      source,
      resource,
      id,
    });

    return response;
  }

  @Post(':source/:resource')
  async create(
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<string>(SocketEvents.Data, {
      type: DataEvents.Create,
      source,
      resource,
      body,
    });

    return response;
  }

  @Put(':source/:resource/:id')
  async update(
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<string>(SocketEvents.Data, {
      type: DataEvents.Update,
      source,
      resource,
      id,
      body,
    });

    return response;
  }

  @Delete(':source/:resource/:id')
  async remove(
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
  ) {
    const response = await this.gateway.send<string>(SocketEvents.Data, {
      type: DataEvents.Delete,
      source,
      resource,
      id,
    });

    return response;
  }
}
