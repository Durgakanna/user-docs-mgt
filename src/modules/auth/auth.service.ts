import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESSTOKEN_EXPIRE, REFRESHTOKEN_EXPIRE } from '../../shared/constant';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJWT(
    user,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id, email, role } = user;
    const accessToken = await this.jwtService.signAsync(
      { id: id, email: email, role: role },
      { secret: process.env.JWT_SECRET, expiresIn: ACCESSTOKEN_EXPIRE },
    );

    const refreshToken = await this.jwtService.signAsync(
      { id: id },
      { secret: process.env.JWT_SECRET, expiresIn: REFRESHTOKEN_EXPIRE },
    );
    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      return null;
    }
  }
}
