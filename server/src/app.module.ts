import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FileService } from "./file/file.service";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    TrackModule,
    FileService,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}