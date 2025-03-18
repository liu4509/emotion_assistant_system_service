import request from '@/utils/request';

/**
 * 上传图片
 * @param {FormData} formData - 包含图片文件的FormData对象，文件字段名必须为'file'
 * @returns {Promise<{success: boolean, status: number, data: {url: string}}>}
 */
export function uploadImage(formData) {
  return request({
    url: '/upload/image',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// 上传图片
const formData = new FormData();
formData.append('file', fileObject); // fileObject 是用户选择的文件

try {
  const response = await uploadImage(formData);
  if (response.success) {
    console.log('图片上传成功，URL:', response.data.url);
  } else {
    console.error('上传失败');
  }
} catch (error) {
  console.error('上传出错:', error);
}
