export class CreateUserDto {
    email: string;
    password: string;
    role?: string;
  }
  
  export class UpdateUserDto {
    role?: string;
  }
  