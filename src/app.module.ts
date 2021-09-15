import {Module} from '@nestjs/common';
import {DataModule} from './data';
import {HermesModule} from './hermes';

@Module({
  imports: [HermesModule, DataModule],
})
export class AppModule {}
