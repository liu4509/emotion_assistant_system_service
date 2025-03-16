import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/Role.entity';
import { Permission } from './entities/permission.entity';
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto/user.dto';
import { md5 } from 'src/utils';
import { JwtUserVo, LoginUserVo } from './vo/user.vo';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;
  @InjectRepository(Role)
  private roleRepository: Repository<Role>;
  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisService)
  private redisService: RedisService;
  // 用户列表
  async findUsersByPage(pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: ['id', 'username', 'email', 'avatar', 'createTime'],
      skip: skipCount,
      take: pageSize,
    });

    return {
      users,
      totalCount,
    };
  }
  // 用户信息修改
  async update(userId: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });
    if (updateUserDto.avatar) {
      foundUser.avatar = updateUserDto.avatar;
    }

    try {
      await this.userRepository.save(foundUser);
      return '用户信息修改成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '用户信息修改成功';
    }
  }
  // 修改密码
  async updatePassword(userId: number, passwordDto: UpdateUserPasswordDto) {
    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });
    foundUser.password = md5(passwordDto.password);
    try {
      await this.userRepository.save(foundUser);
      return '密码修改成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '密码修改失败';
    }
  }
  // 用户信息
  async findUserDetailById(userId: number) {
    const user = this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }
  // 注册
  async register(user: RegisterUserDto) {
    /*
    1. 按照email查询redis中的验证码
    2. 按照username查询用户表
    3. 保存新的user到数据库
    */
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    if (!captcha) {
      throw new HttpException('验证码失效', HttpStatus.BAD_REQUEST);
    }
    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    // 注册默认头像
    newUser.avatar =
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      return '注册失败';
    }

    return 'success';
  }
  // 初始化数据
  async initData() {
    // 用户
    const user1 = new User();
    user1.username = 'lww';
    user1.password = md5('123456');
    user1.email = '2608604500@qq.com';
    user1.isAdmin = true;
    user1.avatar =
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
    const user2 = new User();
    user2.username = 'lzb';
    user2.password = md5('123456');
    user2.email = '2608604500@qq.com';
    user2.avatar =
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

    // 角色
    const role1 = new Role();
    role1.name = '管理员';
    const role2 = new Role();
    role2.name = '普通用户';

    // 权限
    const permission1 = new Permission();
    permission1.code = 'user';
    permission1.description = '访问 user 接口';
    const permission2 = new Permission();
    permission2.code = 'admin';
    permission2.description = '访问 admin 接口';

    // 将角色放入用户
    user1.roles = [role1];
    user2.roles = [role2];

    // 将权限放入角色
    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    // 用户依赖角色，角色依赖权限 注册顺序不能乱
    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }
  // 用户登录
  async login(loginUser: LoginUserDto, isAdmin: boolean) {
    // 在控制器传值判断是否管理员
    const user = await this.userRepository.findOne({
      where: {
        username: loginUser.username,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5(loginUser.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    // 利用 vo 控制返回的数据
    const vo = new LoginUserVo();
    vo.userInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createTime: user.createTime.getTime(),
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      // permissions: user.roles.reduce((arr, item) => {
      //   item.permissions.forEach((permission) => {
      //     console.log(arr.indexOf(Permission));
      // 因为indxOf 是基于对象引用判断 全都不同 所没法去重
      //     if (arr.indexOf(permission.code) === -1) {
      //       console.log(permission.code);
      //       arr.push(permission);
      //       console.log(arr);
      //     }
      //   });
      //   return arr;
      // }, []),
      // 基于 code值来去重
      permissions: [
        ...new Map(
          user.roles
            .flatMap((item) => item.permissions)
            .map((permission) => [permission.code, permission]),
        ).values(),
      ],
    };

    return vo;
  }
  // 通过id查询
  async findUserById(userId: number, isAdmin) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    const vo = new JwtUserVo();
    vo.userId = user.id;
    vo.username = user.username;
    vo.roles = user.roles.map((item) => item.name);
    vo.permissions = [
      ...new Map(
        user.roles
          .flatMap((item) => item.permissions)
          .map((permission) => [permission.code, permission]),
      ).values(),
    ];

    return vo;
  }
}
