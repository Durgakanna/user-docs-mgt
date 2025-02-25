import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Roles } from '../../shared/roles.decorator';
import { RolesGuard } from '../../shared/role.guard';
import { User } from './users.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  /**
   *Creates an instance of UsersController.
   * @param {UsersService} usersService
   * @memberof UsersController
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * To Create/Signup User
   *
   * @memberof UsersController
   */
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The request succeeded.',
    type: User,
  })
  async CreateUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(dto);
  }

  /**
   * For User login
   *
   * @memberof UsersController
   */
  @Post('login')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The request succeeded.',
    type: User,
  })
  async FindUser(
    @Body() dto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.usersService.validateUser(dto);
  }

  /**
   * For user logout
   *
   * @memberof UsersController
   */
  @Post('logout/:id')
  async Logout(@Param('id') userId: number): Promise<number> {
    return await this.usersService.logout(userId);
  }

  /**
   * For get access token using refresh token
   *
   * @memberof UsersController
   */
  @Post('/auth/refresh')
  RefreshAccessToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return this.usersService.refreshAccessToken(refreshToken);
  }

  /**
   * For user role update
   *
   * @memberof UsersController
   */
  @Put(':id/role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async UpdateUserRole(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUserRole(id, dto);
  }

  /**
   * For user delete
   *
   * @memberof UsersController
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  DeleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
