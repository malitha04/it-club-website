import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';

async function testAuth() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  try {
    console.log('Attempting to login with admin credentials...');
    const result = await authService.login({
      email: 'admin@notesphere.com',
      password: 'Admin@123',
    });

    console.log('Login successful!');
    console.log('Access Token:', result.access_token);
    console.log('User:', JSON.stringify(result.user, null, 2));
  } catch (error) {
    console.error('Login failed:', error.message);
  } finally {
    await app.close();
  }
}

testAuth();
