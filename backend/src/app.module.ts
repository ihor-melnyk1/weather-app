import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';

dotenv.config();

@Module({
  imports: [
    WeatherModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
