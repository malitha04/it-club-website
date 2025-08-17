import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../src/user/user.entity';
import { UserRole } from '../src/user/user.entity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database configuration
const dataSource = new DataSource({
  type: 'postgres',  
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'NoteSphere',
  entities: [User],
  synchronize: false,
});

async function createAdminUser() {
  try {
    // Initialize the database connection
    await dataSource.initialize();
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(User);
    
    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({ 
      where: { email: 'admin@notesphere.com' } 
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      await dataSource.destroy();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    // Create admin user
    const adminUser = userRepository.create({
      name: 'Admin User',
      email: 'admin@notesphere.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });

    await userRepository.save(adminUser);
    console.log('Admin user created successfully');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Close the database connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

createAdminUser();
