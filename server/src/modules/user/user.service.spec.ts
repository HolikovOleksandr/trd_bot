import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmptyLogger } from '../../utils/loggs/EmptyLogger';
import {
  mockUser,
  mockFewUsers,
  mockUserDto,
} from '../../utils/mocks/users.mocks';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module = {
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    };

    const app: TestingModule = await Test.createTestingModule(module).compile();
    app.useLogger(new EmptyLogger());

    userService = app.get<UserService>(UserService);
    userRepository = app.get(getRepositoryToken(User));
  });
  afterEach(() => jest.clearAllMocks());
  it('should be defined', () => expect(userService).toBeDefined());

  describe('create', () => {
    it('should create a new user and return it', async () => {
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);

      const result = await userService.create(mockUserDto);
      expect(userRepository.create).toHaveBeenCalledWith(mockUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if saving fails', async () => {
      userRepository.create.mockReturnValue(mockUserDto as User);
      userRepository.save.mockRejectedValue(new Error('Failed to save user'));

      await expect(userService.create(mockUserDto)).rejects.toThrow(
        'Failed to create user: Failed to save user',
      );
    });
  });

  describe('findAll', () => {
    it('shouid return an empty array if no users are found', async () => {
      userRepository.find.mockResolvedValue([]);
      const result = await userService.findAll();
      expect(result).toEqual([]);
    });

    it('should return an array of few users', async () => {
      userRepository.find.mockResolvedValue(mockFewUsers);
      const result = await userService.findAll();
      expect(result).toEqual(mockFewUsers);
    });
  });

  describe('findOne', () => {
    it('should return the user if found', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await userService.findOne('q1w2e3r4t5');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user with given id is not found', async () => {
      await expect(userService.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update the user if found', async () => {
      const id = mockUser.id;
      const updatedUser: User = { id, ...mockUserDto };

      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await userService.update(id, mockUserDto);

      expect(result).toEqual(updatedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user with given id is not found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      const wrongId = '99';

      await expect(() =>
        userService.update(wrongId, mockUserDto),
      ).rejects.toThrow(NotFoundException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: wrongId },
      });
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should handle errors during update', async () => {
      const id = '1';
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.save.mockRejectedValue(new Error('Save failed'));

      await expect(userService.update(id, mockUserDto)).rejects.toThrow(
        'Failed to update user with id 1: Save failed',
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...mockUserDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete the user if found', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      await userService.remove(mockUser.id);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user with given id is not found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      const unexistingId = '99';

      await expect(() => userService.remove(unexistingId)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: unexistingId },
      });
      expect(userRepository.remove).not.toHaveBeenCalled();
    });

    it('should handle errors during deletion', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.remove.mockRejectedValue(new Error('Delete failed'));

      await expect(() => userService.remove(mockUser.id)).rejects.toThrow(
        'Failed to delete user with id 1: Delete failed',
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
    });
  });
});
