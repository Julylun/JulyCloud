import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './shared/storage/storage.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [StorageModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
