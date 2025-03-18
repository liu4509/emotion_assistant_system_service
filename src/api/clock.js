import request from '@/utils/request';

/**
 * 初始化打卡数据
 * @returns {Promise}
 */
export function initClockData() {
  return request({
    url: '/clock/init-data',
    method: 'get',
  });
}

/**
 * 获取所有打卡
 * @returns {Promise}
 */
export function getClockList() {
  return request({
    url: '/clock',
    method: 'get',
  });
}

/**
 * 按分类获取打卡
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getClocksByCategory(params) {
  return request({
    url: '/clock/category',
    method: 'get',
    params,
  });
}

/**
 * 获取我的打卡
 * @returns {Promise}
 */
export function getMyClocks() {
  return request({
    url: '/clock/my',
    method: 'get',
  });
}

/**
 * 获取单个打卡
 * @param {string} id - 打卡ID
 * @returns {Promise}
 */
export function getClockById(id) {
  return request({
    url: `/clock/${id}`,
    method: 'get',
  });
}

/**
 * 创建打卡
 * @param {Object} data
 * @param {string} data.image - 打卡图片地址
 * @param {string[]} data.categoryValues - 分类值数组
 * @returns {Promise}
 */
export function createClock(data) {
  return request({
    url: '/clock',
    method: 'post',
    data,
  });
}

/**
 * 更新打卡
 * @param {string} id - 打卡ID
 * @param {Object} data
 * @param {string} [data.image] - 打卡图片地址
 * @param {string[]} [data.categoryValues] - 分类值数组
 * @returns {Promise}
 */
export function updateClock(id, data) {
  return request({
    url: `/clock/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除打卡
 * @param {string} id - 打卡ID
 * @returns {Promise}
 */
export function deleteClock(id) {
  return request({
    url: `/clock/${id}`,
    method: 'delete',
  });
}

// 获取所有打卡
getClockList();

// 获取单个打卡
getClockById('1');

// 按分类获取打卡
getClocksByCategory({ value: 'very_positive' });

// 获取我的打卡
getMyClocks();

// 创建打卡
createClock({
  image: 'https://example.com/clock.jpg',
  categoryValues: ['very_positive'],
});

// 更新打卡
updateClock('1', {
  image: 'https://example.com/new-clock.jpg',
  categoryValues: ['positive'],
});

// 删除打卡
deleteClock('1');
