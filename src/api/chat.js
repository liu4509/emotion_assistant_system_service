import request from '@/utils/request';

/**
 * 初始化聊天数据
 * @returns {Promise}
 */
export function initChatData() {
  return request({
    url: '/chats/init-data',
    method: 'get',
  });
}

/**
 * 获取所有聊天
 * @returns {Promise}
 */
export function getChatList() {
  return request({
    url: '/chats',
    method: 'get',
  });
}

/**
 * 获取单个聊天
 * @param {string} id - 聊天ID
 * @returns {Promise}
 */
export function getChatById(id) {
  return request({
    url: `/chats/${id}`,
    method: 'get',
  });
}

/**
 * 创建新聊天
 * @param {Object} data
 * @param {string} [data.title] - 聊天标题
 * @returns {Promise}
 */
export function createChat(data) {
  return request({
    url: '/chats',
    method: 'post',
    data,
  });
}

/**
 * 更新聊天标题
 * @param {string} id - 聊天ID
 * @param {Object} data
 * @param {string} data.title - 新标题
 * @returns {Promise}
 */
export function updateChatTitle(id, data) {
  return request({
    url: `/chats/${id}/title`,
    method: 'post',
    data,
  });
}

/**
 * 删除聊天
 * @param {string} id - 聊天ID
 * @returns {Promise}
 */
export function deleteChat(id) {
  return request({
    url: `/chats/${id}`,
    method: 'delete',
  });
}

/**
 * 获取聊天消息列表
 * @param {string} chatId - 聊天ID
 * @returns {Promise}
 */
export function getChatMessages(chatId) {
  return request({
    url: `/chats/${chatId}/messages`,
    method: 'get',
  });
}

/**
 * 创建新消息
 * @param {string} chatId - 聊天ID
 * @param {Object} data
 * @param {string} data.content - 消息内容
 * @returns {Promise}
 */
export function createMessage(chatId, data) {
  return request({
    url: `/chats/${chatId}/messages`,
    method: 'post',
    data,
  });
}

/**
 * 获取AI响应
 * @param {Object} data
 * @param {string} data.content - 消息内容
 * @param {string} data.chatId - 聊天ID
 * @returns {Promise}
 */
export function getAIResponse(data) {
  return request({
    url: '/chats/messages/ai-response',
    method: 'post',
    data,
  });
}

// 获取所有聊天
getChatList();

// 获取单个聊天
getChatById('chat-uuid');

// 创建新聊天
createChat({
  title: '关于焦虑的对话',
});

// 获取聊天消息
getChatMessages('chat-uuid');

// 发送消息
createMessage('chat-uuid', {
  content: '我最近感觉很焦虑',
});

// 获取AI响应
getAIResponse({
  content: '我最近感觉很焦虑',
  chatId: 'chat-uuid',
});
