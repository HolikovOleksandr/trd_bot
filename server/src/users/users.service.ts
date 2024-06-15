import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(dto);
      await this.userRepository.save(user);
      this.logger.log(`Created user with id ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);

    try {
      await this.userRepository.save(user);
      this.logger.log(`Updated user with id ${id}`);
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to update user with id ${id}: ${error.message}`,
        error.stack,
      );
      
      throw new Error(`Failed to update user with id ${id}: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    try {
      await this.userRepository.remove(user);
      this.logger.log(`Deleted user with id ${id}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete user with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
    }
  }
}
