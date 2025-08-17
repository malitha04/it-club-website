import { Body, Controller, Post, UseGuards, Request, Get, UsePipes, ValidationPipe, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard, Roles } from './roles/roles.guard';
import { UserRole } from '@user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Prevent manual setting of admin role through registration
    if (createUserDto.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot register as admin');
    }
    
    const user = await this.authService.register(createUserDto);
    const { access_token } = await this.authService.login({
      email: user.email,
      password: createUserDto.password
    });
    
    return {
      user,
      access_token,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/register')
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createAdmin(createUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/users')
  async getAllUsers() {
    return this.authService.findAllUsers();
  }
}
