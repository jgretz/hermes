import {Response} from 'express';
import {Body, Param, Get, Post, Put, Delete, Controller, Query, Res} from '@nestjs/common';
import {CRUD} from '@jgretz/igor-shared';
import {CrudTypes} from '@jgretz/igor-data-microservice';
import {HermesGateway} from '../../gateway';
import {prepareResponse} from '../services';

@Controller('crud')
export class CrudController {
  gateway: HermesGateway;

  constructor(gateway: HermesGateway) {
    this.gateway = gateway;
  }

  @Get(':source/:resource')
  async find(
    @Res({passthrough: true}) res: Response,
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Query() query: string,
  ) {
    const response = await this.gateway.send<unknown>(CRUD, {
      type: CrudTypes.Find,
      source,
      resource,
      query,
    });

    return prepareResponse(res, response);
  }

  @Get(':source/:resource/:id')
  async findOne(
    @Res({passthrough: true}) res: Response,
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
  ) {
    const response = await this.gateway.send<unknown>(CRUD, {
      type: CrudTypes.FindOne,
      source,
      resource,
      id,
    });

    return prepareResponse(res, response);
  }

  @Post(':source/:resource')
  async create(
    @Res({passthrough: true}) res: Response,
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<unknown>(CRUD, {
      type: CrudTypes.Create,
      source,
      resource,
      body,
    });

    return prepareResponse(res, response);
  }

  @Put(':source/:resource/:id')
  async update(
    @Res({passthrough: true}) res: Response,
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
    @Body() body: string,
  ) {
    const response = await this.gateway.send<unknown>(CRUD, {
      type: CrudTypes.Update,
      source,
      resource,
      id,
      body,
    });

    return prepareResponse(res, response);
  }

  @Delete(':source/:resource/:id')
  async remove(
    @Res({passthrough: true}) res: Response,
    @Param('source') source: string,
    @Param('resource') resource: string,
    @Param('id') id: number,
  ) {
    const response = await this.gateway.send<unknown>(CRUD, {
      type: CrudTypes.Delete,
      source,
      resource,
      id,
    });

    return prepareResponse(res, response);
  }
}
