import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { get } from 'env-var';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Proyecto de Grupo Curso Diseño 2024 Q2')
        .setDescription('API de conexión al Backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix(`api`);

    const port = get('NESTJS_PORT').default(3000).asPortNumber();
    await app.listen(port);
}
bootstrap();
