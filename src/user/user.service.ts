import { Injectable, NotFoundException, ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User, UserRole } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({ 
      where: { email: userData.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ 
      where: { email }
    });
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id }
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async findAll(options?: FindManyOptions<User>): Promise<{data: User[], count: number}> {
    const [data, count] = await this.userRepository.findAndCount({
      ...options,
      relations: ['roles'],
      select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt']
    });
    return { data, count };
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    
    // Prevent changing email to one that's already in use
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({ 
        where: { email: updateData.email } 
      });
      
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }
    
    // Prevent role escalation to admin through regular update
    if (updateData.role === UserRole.ADMIN && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Cannot assign admin role');
    }
    
    await this.userRepository.update(id, updateData);
    return this.findOneById(id);
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findOneById(id);
    const isPasswordValid = await user.validatePassword(changePasswordDto.currentPassword);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    
    user.password = changePasswordDto.newPassword;
    await this.userRepository.save(user);
  }

  async updateUserRole(id: string, role: UserRole, currentUser: User): Promise<User> {
    // Only admins can change roles
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can change user roles');
    }
    
    const user = await this.findOneById(id);
    
    // Prevent changing your own role
    if (user.id === currentUser.id) {
      throw new ForbiddenException('Cannot change your own role');
    }
    
    user.role = role;
    return this.userRepository.save(user);
  }

  async deactivateUser(id: string, currentUser: User): Promise<User> {
    // Only admins can deactivate users
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can deactivate users');
    }
    
    const user = await this.findOneById(id);
    
    // Prevent deactivating yourself
    if (user.id === currentUser.id) {
      throw new ForbiddenException('Cannot deactivate your own account');
    }
    
    user.isActive = false;
    return this.userRepository.save(user);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    // Only admins can delete users
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can delete users');
    }
    
    // Prevent deleting yourself
    if (id === currentUser.id) {
      throw new ForbiddenException('Cannot delete your own account');
    }
    
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
