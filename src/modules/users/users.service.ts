import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './users.model';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly authService: AuthService,
  ) { }

  // To create new user
  async createUser(dto: CreateUserDto): Promise<User> {
    let { role, password, ...rest } = dto;
    role = role ?? UserRole.VIEWER;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({
      ...rest,
      role,
      password: hashedPassword,
      isActive: true
    } as any);
  }

  // To validate user and send token while login
  async validateUser(dto: CreateUserDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.findUserByEmail(dto);
    if (user) {
      const tokens = await this.authService.generateJWT(user);
      const { refreshToken } = tokens;
      await this.userModel.update({ refreshToken }, { where: { id: user.id } });
      return tokens;
    }
  }

  // To fetch user from db based on email then check if user is valid
  async findUserByEmail(dto: CreateUserDto): Promise<any> {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ where: { email, isActive: true } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    return user;
  }

  // To compare password
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // To update the user's role
  async updateUserRole(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    await user.update(dto as any);
    return user;
  }

  // To delete the existing user
  async deleteUser(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    await user.update({ isActive: false });
  }

  // To logout the user
  async logout(userId: number): Promise<number> {
    const result =  await this.userModel.update({ refreshToken: null }, { where: { id: userId } });
    const [id] = result;
    return id;
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) throw new HttpException('Refresh token is required', HttpStatus.BAD_REQUEST);
    const decoded = await this.authService.verifyToken(refreshToken);
    if (!decoded) {
      throw new HttpException('Invalid or expired refresh token', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userModel.findOne({ where: { id: decoded.id, refreshToken } });
    if (!user) {
      throw new HttpException('Refresh token not found', HttpStatus.UNAUTHORIZED);
    }
    const newAccessToken = await this.authService.generateJWT(user);
    return { accessToken: newAccessToken.accessToken };
  }

}
