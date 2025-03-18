import request from '@/utils/request';

/**
 * 初始化游戏数据
 * @returns {Promise}
 */
export function initGameData() {
  return request({
    url: '/game/init-data',
    method: 'get',
  });
}

/**
 * 获取所有游戏
 * @returns {Promise}
 */
export function getGameList() {
  return request({
    url: '/game',
    method: 'get',
  });
}

/**
 * 按分类获取游戏
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getGamesByCategory(params) {
  return request({
    url: '/game/category',
    method: 'get',
    params,
  });
}

/**
 * 获取单个游戏
 * @param {string} id - 游戏ID
 * @returns {Promise}
 */
export function getGameById(id) {
  return request({
    url: `/game/${id}`,
    method: 'get',
  });
}

/**
 * 创建游戏
 * @param {Object} data
 * @param {string} data.title - 游戏标题
 * @param {string} data.url - 游戏链接地址
 * @param {string} data.image - 游戏图片地址
 * @param {string} data.description - 游戏描述
 * @param {string[]} data.categoryValues - 分类值数组
 * @returns {Promise}
 */
export function createGame(data) {
  return request({
    url: '/game',
    method: 'post',
    data,
  });
}

/**
 * 更新游戏
 * @param {string} id - 游戏ID
 * @param {Object} data
 * @param {string} [data.title] - 游戏标题
 * @param {string} [data.url] - 游戏链接地址
 * @param {string} [data.image] - 游戏图片地址
 * @param {string} [data.description] - 游戏描述
 * @param {string[]} [data.categoryValues] - 分类值数组
 * @returns {Promise}
 */
export function updateGame(id, data) {
  return request({
    url: `/game/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除游戏
 * @param {string} id - 游戏ID
 * @returns {Promise}
 */
export function deleteGame(id) {
  return request({
    url: `/game/${id}`,
    method: 'delete',
  });
}
// 获取所有游戏
getGameList();

// 获取单个游戏
getGameById('1');

// 按分类获取游戏
getGamesByCategory({ value: 'very_positive' });

// 创建游戏
createGame({
  title: '色彩方块消消看',
  url: 'https://www.7k7k.com/flash/79305.htm',
  image: 'https://img.picui.cn/free/2025/03/08/67cc4dfa9690f.png',
  description:
    '这是一款消消看游戏，游戏虽然没有花哨的画面但是游戏性和挑战性依旧非常高，看看你能得到多少分，大家快来相互比一比吧！',
  categoryValues: ['very_positive'],
});

// 更新游戏
updateGame('1', {
  title: '新标题',
  description: '新描述',
});

// 删除游戏
deleteGame('1');
