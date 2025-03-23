import request from '@/utils/request';

/**
 * 初始化文章数据
 * @returns {Promise}
 */
export function initArticleData() {
  return request({
    url: '/article/init-data',
    method: 'get',
  });
}

/**
 * 获取所有文章
 * @param {Object} params
 * @param {number} params.pageNo - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise}
 */
export function getArticleList() {
  return request({
    url: '/article',
    method: 'get',
  });
}

/**
 * 按分类获取文章
 * @param {Object} params
 * @param {string} params.value - 分类值
 * @returns {Promise}
 */
export function getArticlesByCategory(params) {
  return request({
    url: '/article/category',
    method: 'get',
    params,
  });
}

/**
 * 获取单篇文章
 * @param {string} id - 文章ID
 * @returns {Promise}
 */
export function getArticleById(id) {
  return request({
    url: `/article/${id}`,
    method: 'get',
  });
}

/**
 * 创建文章
 * @param {Object} data
 * @param {string} data.title - 文章标题
 * @param {string} data.content - 文章内容
 * @param {string} data.cover - 封面图片
 * @param {string} data.description - 文章描述
 * @param {string[]} data.categoryValues - 分类值数组
 * @returns {Promise}
 */
export function createArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data,
  });
}

/**
 * 更新文章
 * @param {string} id - 文章ID
 * @param {Object} data
 * @param {string} [data.title] - 文章标题
 * @param {string} [data.content] - 文章内容
 * @param {string} [data.cover] - 封面图片
 * @param {string} [data.description] - 文章描述
 * @param {string[]} [data.categoryValues] - 分类值数组
 * @returns {Promise}
 */
export function updateArticle(id, data) {
  return request({
    url: `/article/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除文章
 * @param {string} id - 文章ID
 * @returns {Promise}
 */
export function deleteArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'delete',
  });
}

// // 获取所有文章
// getArticleList();

// // 获取单篇文章
// getArticleById('1');

// // 按分类获取文章
// getArticlesByCategory({ value: 'very_positive' });

// // 创建文章
// createArticle({
//   title: '如何缓解焦虑情绪',
//   content: '文章内容...',
//   cover: 'cover.jpg',
//   description: '文章描述...',
//   categoryValues: ['very_positive'],
// });

// // 更新文章
// updateArticle('1', {
//   title: '新标题',
//   content: '新内容',
// });

// // 删除文章
// deleteArticle('1');
