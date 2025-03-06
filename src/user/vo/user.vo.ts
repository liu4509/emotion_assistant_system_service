import { Permission } from '../entities/permission.entity';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  headPic: string;
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
  id: number;
  username: string;
  roles: string[];
  permissions: Permission[];
}
