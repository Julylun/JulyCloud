import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './shared/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
