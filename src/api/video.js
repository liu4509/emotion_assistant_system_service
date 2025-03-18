import request from '@/utils/request';

/**
 * 初始化视频数据
 * @returns {Promise}
 */
export function initVideoData() {
  return request({
    url: '/video/init-data',
    method: 'get',
  });
}

/**
 * 获取所有视频
 * @returns {Promise}
 */
export function getVideoList() {
  return request({
    url: '/video',
    method: 'get',
  });
}

/**
 * 根据分类获取视频
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getVideosByCategory(params) {
  return request({
    url: '/video/category',
    method: 'get',
    params,
  });
}

/**
 * 获取单个视频
 * @param {string} id - 视频ID
 * @returns {Promise}
 */
export function getVideoById(id) {
  return request({
    url: `/video/${id}`,
    method: 'get',
  });
}

/**
 * 创建视频
 * @param {Object} data
 * @param {string} data.title - 视频标题
 * @param {string} data.url - 视频URL
 * @param {string} data.cover - 视频封面URL
 * @param {string} data.description - 视频描述
 * @param {Array<string>} data.categoryValues - 分类值列表
 * @returns {Promise}
 */
export function createVideo(data) {
  return request({
    url: '/video',
    method: 'post',
    data,
  });
}

/**
 * 更新视频
 * @param {string} id - 视频ID
 * @param {Object} data
 * @param {string} [data.title] - 视频标题
 * @param {string} [data.url] - 视频URL
 * @param {string} [data.cover] - 视频封面URL
 * @param {string} [data.description] - 视频描述
 * @param {Array<string>} [data.categoryValues] - 分类值列表
 * @returns {Promise}
 */
export function updateVideo(id, data) {
  return request({
    url: `/video/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除视频
 * @param {string} id - 视频ID
 * @returns {Promise}
 */
export function deleteVideo(id) {
  return request({
    url: `/video/${id}`,
    method: 'delete',
  });
}

// 获取所有视频
getVideoList();

// 根据分类获取视频
getVideosByCategory({ value: 'very_positive' });

// 获取单个视频
getVideoById('1');

// 创建视频
createVideo({
  title: '如何进行情绪管理',
  url: 'https://example.com/video.mp4',
  cover: 'https://example.com/cover.jpg',
  description: '本视频介绍了几种实用的情绪管理技巧...',
  categoryValues: ['very_positive', 'positive'],
});

// 更新视频
updateVideo('1', {
  title: '新标题',
  description: '新描述',
});

// 删除视频
deleteVideo('1');
