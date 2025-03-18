import request from '@/utils/request';

/**
 * 初始化日记数据
 * @returns {Promise}
 */
export function initDiarieData() {
  return request({
    url: '/diarie/init-data',
    method: 'get',
  });
}

/**
 * 获取所有日记
 * @returns {Promise}
 */
export function getDiarieList() {
  return request({
    url: '/diarie',
    method: 'get',
  });
}

/**
 * 按情绪获取日记
 * @param {Object} params
 * @param {string} params.value - 情绪值
 * @returns {Promise}
 */
export function getDiariesByMood(params) {
  return request({
    url: '/diarie/mood',
    method: 'get',
    params,
  });
}

/**
 * 获取我的日记
 * @returns {Promise}
 */
export function getMyDiaries() {
  return request({
    url: '/diarie/user',
    method: 'get',
  });
}

/**
 * 获取单个日记
 * @param {number} id - 日记ID
 * @returns {Promise}
 */
export function getDiarieById(id) {
  return request({
    url: `/diarie/${id}`,
    method: 'get',
  });
}

/**
 * 创建日记
 * @param {Object} data
 * @param {string} data.content - 日记内容
 * @param {string[]} data.moodValues - 情绪值数组
 * @returns {Promise}
 */
export function createDiarie(data) {
  return request({
    url: '/diarie',
    method: 'post',
    data,
  });
}

/**
 * 更新日记
 * @param {number} id - 日记ID
 * @param {Object} data
 * @param {string} [data.content] - 日记内容
 * @param {string[]} [data.moodValues] - 情绪值数组
 * @returns {Promise}
 */
export function updateDiarie(id, data) {
  return request({
    url: `/diarie/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除日记
 * @param {number} id - 日记ID
 * @returns {Promise}
 */
export function deleteDiarie(id) {
  return request({
    url: `/diarie/${id}`,
    method: 'delete',
  });
}

// 获取所有日记
getDiarieList();

// 获取单个日记
getDiarieById(1);

// 按情绪获取日记
getDiariesByMood({ value: 'happy' });

// 获取我的日记
getMyDiaries();

// 创建日记
createDiarie({
  content: '今天心情很好，完成了所有工作！',
  moodValues: ['happy', 'excited'],
});

// 更新日记
updateDiarie(1, {
  content: '更新后的日记内容',
  moodValues: ['content'],
});

// 删除日记
deleteDiarie(1);
