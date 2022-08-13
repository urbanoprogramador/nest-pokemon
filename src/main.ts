import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    exceptionFactory: (error) => {
      const translateMsg:string[] =[]
      error.forEach(element => {
        for (const key in element.constraints) {
          if(key === 'whitelistValidation'){
            translateMsg.push(`${element.property} no esta definida`);
          } else if(key === 'isNumber'){
            translateMsg.push(`${element.property} debe ser un numero`);
          }else {
            translateMsg.push(element.constraints[key]);
          }
        }
      });
      throw new BadRequestException(translateMsg);
    }
  }));
  await app.listen(3000);
}
bootstrap();
