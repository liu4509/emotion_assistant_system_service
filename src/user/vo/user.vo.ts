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
  userInfo: UserInfo;
}
export class UserListVo {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  createTime: number;
  roles: string[];
  permissions: Permission[];
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
