import {Body, Param, Get, Post, Put, Delete, Controller} from '@nestjs/common';
import {HermesGateway} from '../../hermes';
import {DataEvents} from '../Types';

@Controller('data')
export class DataController {
  gateway: HermesGateway;

  constructor(gateway: HermesGateway) {
    this.gateway = gateway;
  }

  @Get(':source/:entity')
  async findAll(@Param('source') source: string, @Param('entity') entity: string): Promise<string> {
    const response = await this.gateway.send<string>(DataEvents.FindAll, {source, entity});

    return response;
  }

  // @Get(':id')
  // @Bind(Param('data'), Param('id'))
  // async findOne(id: number) {}

  // @Post()
  // @Bind(Body())
  // async create(body) {}

  // @Put(':id')
  // @Bind(Param('id'), Body())
  // async update(id, body) {}

  // @Delete(':id')
  // @Bind(Param('id'))
  // async remove(id) {}
}
