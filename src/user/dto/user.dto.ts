import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, { message: '密码不能少于6位' })
  password: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;
  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty({
    message: '当前密码不能为空',
  })
  @MinLength(6, {
    message: '当前密码不能少于 6 位',
  })
  currentPassword: string;
  @IsNotEmpty({
    message: '新密码不能为空',
  })
  @MinLength(6, {
    message: '新密码不能少于 6 位',
  })
  password: string;
  @IsNotEmpty({
    message: '验证码不能为空',
  })
  verifyCode: string;
}

export class UpdateUserDto {
  avatar: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  email: string;
}
