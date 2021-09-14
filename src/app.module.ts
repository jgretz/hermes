import {Module} from '@nestjs/common';
import {HermesGateway} from './hermes/hermes.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [HermesGateway],
})
export class AppModule {}
