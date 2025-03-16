import { Permission } from '../entities/permission.entity';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  createTime: number;
  roles: string[];
  permissions: Permission[];
}

export class UserDetailVo {
  id: number;
  username: string;
  email: string;
  avatar: string;
  createTime: Date;
}

export class LoginUserVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export class JwtUserVo {
  userId: number;
  username: string;
  roles: string[];
  permissions: Permission[];
}
