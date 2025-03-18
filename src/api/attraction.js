import request from '@/utils/request';

/**
 * 初始化景点数据
 * @returns {Promise}
 */
export function initAttractionData() {
  return request({
    url: '/attraction/init-data',
    method: 'get',
  });
}

/**
 * 获取所有景点
 * @returns {Promise}
 */
export function getAttractionList() {
  return request({
    url: '/attraction',
    method: 'get',
  });
}

/**
 * 按分类获取景点
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getAttractionsByCategory(params) {
  return request({
    url: '/attraction/category',
    method: 'get',
    params,
  });
}

/**
 * 获取单个景点
 * @param {string} id - 景点ID
 * @returns {Promise}
 */
export function getAttractionById(id) {
  return request({
    url: `/attraction/${id}`,
    method: 'get',
  });
}

/**
 * 创建景点
 * @param {Object} data
 * @param {string} data.title - 景点标题
 * @param {string} data.details - 景点详情
 * @param {string} data.image - 景点图片
 * @param {string[]} data.categoryValues - 分类值数组
 * @returns {Promise}
 */
export function createAttraction(data) {
  return request({
    url: '/attraction',
    method: 'post',
    data,
  });
}

/**
 * 更新景点
 * @param {string} id - 景点ID
 * @param {Object} data
 * @param {string} [data.title] - 景点标题
 * @param {string} [data.details] - 景点详情
 * @param {string} [data.image] - 景点图片
 * @param {string[]} [data.categoryValues] - 分类值数组
 * @returns {Promise}
 */
export function updateAttraction(id, data) {
  return request({
    url: `/attraction/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除景点
 * @param {string} id - 景点ID
 * @returns {Promise}
 */
export function deleteAttraction(id) {
  return request({
    url: `/attraction/${id}`,
    method: 'delete',
  });
}

// 获取所有景点
getAttractionList();

// 获取单个景点
getAttractionById('1');

// 按分类获取景点
getAttractionsByCategory({ value: 'very_positive' });

// 创建景点
createAttraction({
  title: '美丽的西湖',
  details: '西湖景区包含了丰富的自然和人文景观...',
  image: 'https://example.com/xihu.jpg',
  categoryValues: ['very_positive'],
});

// 更新景点
updateAttraction('1', {
  title: '新标题',
  details: '新描述',
});

// 删除景点
deleteAttraction('1');
