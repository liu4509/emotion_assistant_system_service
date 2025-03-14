import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto/user.dto';
import { JwtUserVo, UserDetailVo } from './vo/user.vo';
import {
  RequireLogin,
  RequirePermission,
  UserInfo,
} from 'src/decorator/custom.decorator';
import { generateParseIntPipe } from 'src/utils';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(ConfigService)
  private configService: ConfigService;
  @Inject(RedisService)
  private redisService: RedisService;
  @Inject(EmailService)
  private emailService: EmailService;

  // 验证码
  @Get('register-captcha')
  async captcha(
    @Query('address') address: string,
    @Query('ttl') ttl: number = 60,
  ) {
    const code = Math.random().toString().slice(2, 8);
    console.log(`${address} -- ${code}`);

    await this.redisService.set(`captcha_${address}`, code, ttl);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码 - 心情治愈网站',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A90E2;">你好！👋</h2>
          <p style="font-size: 16px;">感谢你使用心情治愈网站！以下是你的注册验证码：</p>
          <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #4A90E2; margin: 0;">${code}</p>
          </div>
          <button 
            style="background: #4A90E2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;"
            onclick="navigator.clipboard.writeText('${code}').then(() => alert('验证码已复制！'))"
          >
            点击复制验证码
          </button>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">温馨提示：此验证码将在 ${ttl < 60 ? `${ttl} 秒` : `${Math.floor(ttl / 60)} 分钟`}后失效，请尽快使用。</p>
          <p style="font-size: 14px; color: #666;">如果你未进行此操作，请忽略此邮件。</p>
        </div>
        `,
    });
    return '发送成功';

    // await this.emailService.sendMail({
    //   to: address,
    //   subject: '注册验证码',
    //   html: `<p>你的验证码是${code}</p>`,
    // });
    // return '发送成功';
  }
  // 用户列表 权限：登录后并有admin权限
  @Get('admin/list')
  @RequireLogin()
  @RequirePermission('admin')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
  ) {
    return await this.userService.findUsersByPage(pageNo, pageSize);
  }
  // 用户、管理员信息修改
  @Post(['update', 'admin/update'])
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }
  // 管理员、用户密码修改
  @Post(['update_password', 'admin/update_password'])
  @RequireLogin()
  async updatePassword(
    @UserInfo('userId') userId: number,
    @Body() passwordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updatePassword(userId, passwordDto);
  }
  // 用户信息
  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);

    const vo = new UserDetailVo();
    vo.id = user.id;
    vo.username = user.username;
    vo.email = user.email;
    vo.headPic = user.headPic;
    vo.createTime = user.createTime;

    return vo;
  }
  // 注册
  @Post('register')
  async register(@Body() register: RegisterUserDto) {
    return await this.userService.register(register);
  }
  // 初始数据
  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }
  // 用户登录
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    // 增加JWT和无感刷新token
    const vo = await this.userService.login(loginUser, false);

    const { accessToken, refreshToken } = await this.jwt({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions,
    });
    vo.accessToken = accessToken;
    vo.refreshToken = refreshToken;

    return vo;
  }
  // 管理员登录
  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, true);

    const { accessToken, refreshToken } = await this.jwt({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions,
    });
    vo.accessToken = accessToken;
    vo.refreshToken = refreshToken;

    return vo;
  }
  // token刷新
  @Get('refresh')
  async refresh(@Query('refreshToken') refToken: string) {
    // 1. 解析 token
    // 2. 用户id 查询
    // 3. 查询到 重新加密
    try {
      const data = await this.jwtService.verify(refToken);
      const user = await this.userService.findUserById(data.userId, false);

      const { accessToken, refreshToken } = await this.jwt({
        userId: user.userId,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
      });

      const access_token = accessToken;
      const refresh_token = refreshToken;

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Token已失效,请重新登录', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refToken: string) {
    // 1. 解析 token
    // 2. 用户id 查询
    // 3. 查询到 重新加密
    try {
      const data = await this.jwtService.verify(refToken);
      const user = await this.userService.findUserById(data.userId, true);

      const { accessToken, refreshToken } = await this.jwt({
        userId: user.userId,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
      });

      const access_token = accessToken;
      const refresh_token = refreshToken;

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Token已失效,请重新登录', HttpStatus.BAD_REQUEST);
    }
  }
  async jwt(tokenUserVo: JwtUserVo) {
    const accessToken = this.jwtService.sign(
      {
        userId: tokenUserVo.userId,
        username: tokenUserVo.username,
        roles: tokenUserVo.roles,
        permissions: tokenUserVo.permissions,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );
    const refreshToken = this.jwtService.sign(
      { userId: tokenUserVo.userId },
      {
        expiresIn:
          this.configService.get('jwt_refresh_token_expres_time') || '7d',
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
