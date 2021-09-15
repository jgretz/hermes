import {Module} from '@nestjs/common';
import {HermesModule} from '../hermes';

import {DataController} from './controllers';

@Module({
  imports: [HermesModule],
  controllers: [DataController],
})
export class DataModule {}
