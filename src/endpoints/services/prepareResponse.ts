import {Response} from 'express';
import {HttpStatus} from '@nestjs/common';
import {IgorResult, IgorResultType} from '@jgretz/igor-shared';

const StatusMap = {
  [IgorResultType.Success]: HttpStatus.OK,
  [IgorResultType.Error]: HttpStatus.INTERNAL_SERVER_ERROR,
  [IgorResultType.AccessDenied]: HttpStatus.FORBIDDEN,
  [IgorResultType.NotFound]: HttpStatus.NOT_FOUND,
  [IgorResultType.Timeout]: HttpStatus.REQUEST_TIMEOUT,
};

export default (res: Response, raw: unknown): unknown => {
  const response =
    typeof raw === 'string'
      ? (JSON.parse(raw) as IgorResult<unknown>)
      : (raw as IgorResult<unknown>);

  res.status(
    StatusMap[response.type] ??
      (response.result ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR),
  );

  return response.result;
};
