import request from '@/utils/request';

/**
 * 初始化问卷数据
 * @returns {Promise}
 */
export function initQuestionnaireData() {
  return request({
    url: '/questionnaire/init-data',
    method: 'get',
  });
}

/**
 * 获取所有问卷
 * @returns {Promise}
 */
export function getQuestionnaireList() {
  return request({
    url: '/questionnaire',
    method: 'get',
  });
}

/**
 * 获取单个问卷
 * @param {string} id - 问卷ID
 * @returns {Promise}
 */
export function getQuestionnaireById(id) {
  return request({
    url: `/questionnaire/${id}`,
    method: 'get',
  });
}

/**
 * 创建问卷
 * @param {Object} data
 * @param {string} data.title - 问卷标题
 * @param {string} data.description - 问卷描述
 * @param {Array} data.questions - 问题列表
 * @param {string} data.questions[].content - 问题内容
 * @param {Array} data.questions[].options - 选项列表
 * @param {string} data.questions[].options[].content - 选项内容
 * @param {number} data.questions[].options[].score - 选项分值
 * @returns {Promise}
 */
export function createQuestionnaire(data) {
  return request({
    url: '/questionnaire',
    method: 'post',
    data,
  });
}

/**
 * 更新问卷
 * @param {string} id - 问卷ID
 * @param {Object} data
 * @param {string} [data.title] - 问卷标题
 * @param {string} [data.description] - 问卷描述
 * @param {Array} [data.questions] - 问题列表
 * @param {string} [data.questions[].content] - 问题内容
 * @param {Array} [data.questions[].options] - 选项列表
 * @param {string} [data.questions[].options[].content] - 选项内容
 * @param {number} [data.questions[].options[].score] - 选项分值
 * @returns {Promise}
 */
export function updateQuestionnaire(id, data) {
  return request({
    url: `/questionnaire/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除问卷
 * @param {string} id - 问卷ID
 * @returns {Promise}
 */
export function deleteQuestionnaire(id) {
  return request({
    url: `/questionnaire/${id}`,
    method: 'delete',
  });
}

// 获取所有问卷
getQuestionnaireList();

// 获取单个问卷
getQuestionnaireById('1');

// 创建问卷
createQuestionnaire({
  title: '情绪健康评估问卷',
  description: '这是一份用于评估情绪健康状况的问卷',
  questions: [
    {
      content: '我经常感到心情愉快？',
      options: [
        { content: '非常不同意', score: 1 },
        { content: '不同意', score: 2 },
        { content: '一般', score: 3 },
        { content: '同意', score: 4 },
        { content: '非常同意', score: 5 },
      ],
    },
  ],
});

// 更新问卷
updateQuestionnaire('1', {
  title: '新标题',
  description: '新描述',
});

// 删除问卷
deleteQuestionnaire('1');
