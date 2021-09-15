import {Module} from '@nestjs/common';

import {HermesGateway} from './gateways';

@Module({
  imports: [],
  providers: [HermesGateway],
  exports: [HermesGateway],
})
export class HermesModule {}
