import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new HttpException('Token is required', HttpStatus.NOT_FOUND);
    }

    try {
      const user = await this.authService.verifyToken(token);
      if (!requiredRoles.includes(user.role)) {
        throw new HttpException(
          'Access Denied: Admins Only',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Invalid or Expired Token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
