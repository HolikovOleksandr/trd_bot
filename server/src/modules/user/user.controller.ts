import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(dto);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.update(id, dto);
    } catch (error) {
      this.logger.error(
        `Failed to update user with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      this.logger.error(
        `Failed to delete user with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new NotFoundException(error.message);
    }
  }
}
