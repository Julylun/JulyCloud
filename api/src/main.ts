import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/HttpExceptionFilter.class';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    
  });


  app.use((req,res,next) => {
    res.setTimeout(300000); //5 minutes
    next()
  })


  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(process.env.PORT ?? 7749);
}
bootstrap();
