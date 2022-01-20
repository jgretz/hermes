import {Module} from '@nestjs/common';

import {HermesGateway} from './hermes.gateway';

@Module({
  imports: [],
  providers: [HermesGateway],
  exports: [HermesGateway],
})
export class HermesModule {}
