import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createUserPayload, result } from './user.mockdata';
import { AuthModule } from '../auth/auth.module';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            validateUser: jest.fn(),
            logout: jest.fn(),
            refreshAccessToken: jest.fn(),
            updateUserRole: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
      imports: [AuthModule],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('CreateUser', () => {
    it('should create a user', async () => {
      jest.spyOn(usersService, 'createUser').mockResolvedValue(result as any);
      expect(await usersController.CreateUser(createUserPayload)).toBe(result);
    });
  });

  describe('FindUser', () => {
    it('should return access and refresh tokens', async () => {
      const result = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };
      jest.spyOn(usersService, 'validateUser').mockResolvedValue(result);

      expect(await usersController.FindUser(createUserPayload)).toBe(result);
    });
  });

  describe('Logout', () => {
    it('should logout a user', async () => {
      const userId = 1;
      const result = 1;
      jest.spyOn(usersService, 'logout').mockResolvedValue(result);

      expect(await usersController.Logout(userId)).toBe(result);
    });
  });

  describe('RefreshAccessToken', () => {
    it('should return a new access token', async () => {
      const refreshToken = 'refresh_token';
      const result = { accessToken: 'new_access_token' };
      jest.spyOn(usersService, 'refreshAccessToken').mockResolvedValue(result);

      expect(await usersController.RefreshAccessToken(refreshToken)).toBe(
        result,
      );
    });
  });

  describe('UpdateUserRole', () => {
    it('should update a user role', async () => {
      jest
        .spyOn(usersService, 'updateUserRole')
        .mockResolvedValue(result as any);

      expect(await usersController.UpdateUserRole(1, createUserPayload)).toBe(
        result,
      );
    });
  });

  describe('DeleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(undefined);

      expect(await usersController.DeleteUser(result.id)).toBeUndefined();
    });
  });
});
