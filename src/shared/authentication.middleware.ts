import {
  NestMiddleware,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const accessToken = request.headers['authorization'];
    if (!accessToken)
      throw new HttpException(
        'Access token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    try {
      const decoded = await this.authService.verifyToken(accessToken);
      if (!decoded)
        throw new HttpException(
          'Invalid or expired access token',
          HttpStatus.UNAUTHORIZED,
        );
      next();
    } catch (error) {
      throw new HttpException(
        'Invalid or expired access token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
