import request from '@/utils/request';

/**
 * 初始化情绪调节场景数据
 * @returns {Promise}
 */
export function initScenarioData() {
  return request({
    url: '/scenario/init-data',
    method: 'get',
  });
}

/**
 * 获取所有情绪调节场景
 * @returns {Promise}
 */
export function getScenarioList() {
  return request({
    url: '/scenario',
    method: 'get',
  });
}

/**
 * 获取单个情绪调节场景
 * @param {string} id - 场景ID
 * @returns {Promise}
 */
export function getScenarioById(id) {
  return request({
    url: `/scenario/${id}`,
    method: 'get',
  });
}

/**
 * 创建情绪调节场景
 * @param {Object} data
 * @param {string} data.title - 场景标题
 * @param {string} data.description - 场景描述
 * @param {Array} data.questions - 问题列表
 * @param {string} data.questions[].content - 问题内容
 * @param {number} data.questions[].order - 问题顺序(1-5)
 * @param {Array} data.questions[].options - 解决方案列表
 * @param {string} data.questions[].options[].content - 解决方案内容
 * @param {boolean} data.questions[].options[].is_correct - 是否为最佳答案
 * @returns {Promise}
 */
export function createScenario(data) {
  return request({
    url: '/scenario',
    method: 'post',
    data,
  });
}

/**
 * 更新情绪调节场景
 * @param {string} id - 场景ID
 * @param {Object} data
 * @param {string} [data.title] - 场景标题
 * @param {string} [data.description] - 场景描述
 * @param {Array} [data.questions] - 问题列表
 * @param {string} [data.questions[].content] - 问题内容
 * @param {number} [data.questions[].order] - 问题顺序(1-5)
 * @param {Array} [data.questions[].options] - 解决方案列表
 * @param {string} [data.questions[].options[].content] - 解决方案内容
 * @param {boolean} [data.questions[].options[].is_correct] - 是否为最佳答案
 * @returns {Promise}
 */
export function updateScenario(id, data) {
  return request({
    url: `/scenario/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除情绪调节场景
 * @param {string} id - 场景ID
 * @returns {Promise}
 */
export function deleteScenario(id) {
  return request({
    url: `/scenario/${id}`,
    method: 'delete',
  });
}

// 获取所有情绪调节场景
getScenarioList();

// 获取单个情绪调节场景
getScenarioById('1');

// 创建情绪调节场景
createScenario({
  title: '日常情绪调节场景',
  description: '这是一个帮助你学习如何在日常生活中调节情绪的场景',
  questions: [
    {
      content: '当你感到愤怒时，以下哪种方式更有效？',
      order: 1,
      options: [
        { content: '深呼吸，数到10', is_correct: true },
        { content: '大声喊叫发泄情绪', is_correct: false },
      ],
    },
  ],
});

// 更新情绪调节场景
updateScenario('1', {
  title: '新标题',
  description: '新描述',
});

// 删除情绪调节场景
deleteScenario('1');
