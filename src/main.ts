import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './users/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Bed Management Backend')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer'
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const roleGuard = app.get(RolesGuard);
    const firebaseAuthGuard = app.get(FirebaseAuthGuard);

    app.useGlobalGuards(firebaseAuthGuard, roleGuard);

    await app.listen(3000);
}
bootstrap();

