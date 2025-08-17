import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Ensure user has a password set
    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Use the validatePassword method from the User entity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role,
      isActive: user.isActive
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Default role is STUDENT unless specified otherwise
    const userRole = createUserDto.role || UserRole.STUDENT;
    
    const user = await this.userService.create({
      ...createUserDto,
      role: userRole,
      isActive: true,
    });

    const { password, ...result } = user;
    return result;
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userService.create({
      ...createUserDto,
      role: UserRole.ADMIN,
      isActive: true,
    });

    const { password, ...result } = user;
    return result;
  }

  async getProfile(userId: string) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }

  async findAllUsers() {
    const { data: users } = await this.userService.findAll();
    return users;
  }
}
