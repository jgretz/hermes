import {Module} from '@nestjs/common';
import {EndpointsModule} from './endpoints';
import {HermesModule} from './gateway';

@Module({
  imports: [HermesModule, EndpointsModule],
})
export class AppModule {}
