import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/HttpExceptionFilter.class';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    
  });

  app.use((req,res,next) => {
    res.setTimeout(300000); //5 minutes
    next()
  })

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();


  const swaggerOptions = new DocumentBuilder()
  .setTitle('July Cloud API Documentation')
  .setDescription('')
  .setVersion('1.0')
  .addTag('July Cloud')
  .build();
  const swaggerDocument = () => SwaggerModule.createDocument(app,swaggerOptions);

  SwaggerModule.setup('api',app,swaggerDocument);


  await app.listen(process.env.PORT ?? 7749);
}
bootstrap();
