import {Module} from '@nestjs/common';
import {HermesModule} from '../gateway';

import {CrudController, CommandController} from './controllers';

@Module({
  imports: [HermesModule],
  controllers: [CrudController, CommandController],
})
export class EndpointsModule {}
