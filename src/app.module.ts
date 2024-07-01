import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightController } from './controller/knight.controller';
import { KnightService } from './services/knight.service';
import { InfraModule } from './infra/infra.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    InfraModule,
  ],
  controllers: [KnightController],
  providers: [KnightService],
})
export class AppModule {}
