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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(ConfigService)
  private configService: ConfigService;

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
