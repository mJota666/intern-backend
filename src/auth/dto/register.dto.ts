import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsEnum(['admin', 'editor', 'client'] as const)
  role?: 'admin' | 'editor' | 'client';
}
