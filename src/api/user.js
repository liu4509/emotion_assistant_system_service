import request from '@/utils/request';

/**
 * 用户登录
 * @param {Object} data
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

/**
 * 管理员登录
 * @param {Object} data
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function adminLogin(data) {
  return request({
    url: '/user/admin/login',
    method: 'post',
    data,
  });
}

/**
 * 用户注册
 * @param {Object} data
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} data.email - 邮箱
 * @param {string} data.captcha - 验证码
 * @returns {Promise}
 */
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

/**
 * 获取用户信息
 * @returns {Promise}
 */
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  });
}

/**
 * 更新用户信息
 * @param {Object} data
 * @param {string} data.avatar - 头像
 * @param {string} data.email - 邮箱
 * @returns {Promise}
 */
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data,
  });
}

/**
 * 更新用户密码
 * @param {Object} data
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise}
 */
export function updateUserPassword(data) {
  return request({
    url: '/user/update_password',
    method: 'post',
    data,
  });
}

/**
 * 更新管理员密码
 * @param {Object} data
 * @param {string} data.oldPassword - 旧密码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise}
 */
export function updateAdminPassword(data) {
  return request({
    url: '/user/admin/update_password',
    method: 'post',
    data,
  });
}

/**
 * 刷新用户token
 * @returns {Promise}
 */
export function refreshUserToken() {
  return request({
    url: '/user/refresh',
    method: 'get',
  });
}

/**
 * 刷新管理员token
 * @returns {Promise}
 */
export function refreshAdminToken() {
  return request({
    url: '/user/admin/refresh',
    method: 'get',
  });
}

/**
 * 获取用户列表（管理员）
 * @param {Object} params
 * @param {number} params.pageNo - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise}
 */
export function getUserList(params) {
  return request({
    url: '/user/admin/list',
    method: 'get',
    params,
  });
}

/**
 * 管理员更新用户信息
 * @param {Object} data
 * @param {number} data.id - 用户ID
 * @param {string} data.username - 用户名
 * @param {string} data.email - 邮箱
 * @param {string} data.avatar - 头像
 * @returns {Promise}
 */
export function adminUpdateUser(data) {
  return request({
    url: '/user/admin/update',
    method: 'post',
    data,
  });
}
