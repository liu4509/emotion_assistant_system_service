import request from '@/utils/request';

/**
 * 初始化音频数据
 * @returns {Promise}
 */
export function initMediaData() {
  return request({
    url: '/media/init-data',
    method: 'get',
  });
}

/**
 * 获取所有音频
 * @param {Object} params
 * @param {number} params.pageNo - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise}
 */
export function getMediaList() {
  return request({
    url: '/media',
    method: 'get',
  });
}

/**
 * 按分类获取音频
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getMediasByCategory(params) {
  return request({
    url: '/media/category',
    method: 'get',
    params,
  });
}

/**
 * 获取单个音频
 * @param {string} id - 音频ID
 * @returns {Promise}
 */
export function getMediaById(id) {
  return request({
    url: `/media/${id}`,
    method: 'get',
  });
}

/**
 * 创建音频
 * @param {Object} data
 * @param {string} data.title - 音频标题
 * @param {string} data.artist - 艺术家
 * @param {string} data.cover - 封面图片地址
 * @param {string} data.url - 音频链接地址
 * @param {number} data.duration - 时长(秒)
 * @param {string} data.description - 音频描述
 * @param {string[]} data.categoryValues - 分类值数组
 * @returns {Promise}
 */
export function createMedia(data) {
  return request({
    url: '/media',
    method: 'post',
    data,
  });
}

/**
 * 更新音频
 * @param {string} id - 音频ID
 * @param {Object} data
 * @param {string} [data.title] - 音频标题
 * @param {string} [data.artist] - 艺术家
 * @param {string} [data.cover] - 封面图片地址
 * @param {string} [data.url] - 音频链接地址
 * @param {number} [data.duration] - 时长(秒)
 * @param {string} [data.description] - 音频描述
 * @param {string[]} [data.categoryValues] - 分类值数组
 * @returns {Promise}
 */
export function updateMedia(id, data) {
  return request({
    url: `/media/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除音频
 * @param {string} id - 音频ID
 * @returns {Promise}
 */
export function deleteMedia(id) {
  return request({
    url: `/media/${id}`,
    method: 'delete',
  });
}
// 获取所有音频
getMediaList();

// 获取单个音频
getMediaById('1');

// 按分类获取音频
getMediasByCategory({ value: 'very_positive' });

// 创建音频
createMedia({
  title: '罗生门',
  artist: '梨冻紧',
  cover:
    'https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=300y300',
  url: 'https://m701.music.126.net/20250315024344/c8cb579fd705785f686572577d673500/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096444542/bafc/a068/39f8/9a9e06e5634410b5e7e81df24749e656.mp3',
  duration: 180,
  description: '轻快的春日旋律',
  categoryValues: ['very_positive'],
});

// 更新音频
updateMedia('1', {
  title: '新标题',
  description: '新描述',
});

// 删除音频
deleteMedia('1');
