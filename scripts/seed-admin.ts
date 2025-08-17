import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import { UserRole } from '../src/user/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const adminData = {
    name: 'Admin User',
    email: 'admin@notesphere.com',
    password: 'Admin@123', // In a real app, this should come from environment variables
    role: UserRole.ADMIN,
    isActive: true,
  };

  try {
    // Check if admin already exists
    const existingAdmin = await userService.findOneByEmail(adminData.email);
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await app.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    
    // Create admin user
    await userService.create({
      ...adminData,
      password: hashedPassword,
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
