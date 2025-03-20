import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class DeepseekService {
  private readonly openai: OpenAI;
  private readonly model: string;
  private readonly logger = new Logger(DeepseekService.name);
  // TODO: 通过动态配置 deepseek token 数据库取值

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('deepseek_api_key');
    console.log(apiKey);
    const baseURL = this.configService.get('deepseek_api_url');
    const model = this.configService.get('deepseek_model');

    this.logger.log(
      `初始化DeepseekService: API URL=${baseURL}, Model=${model}`,
    );

    if (!apiKey) {
      this.logger.error('缺少DeepSeek API密钥配置');
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL,
    });
    this.model = model;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      this.logger.log(
        `调用DeepSeek API, 模型: ${this.model}, 提示词长度: ${prompt.length}`,
      );

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      if (!response.choices || response.choices.length === 0) {
        this.logger.error('DeepSeek API返回了空的响应');
        throw new Error('API返回了空的响应');
      }

      const content = response.choices[0].message.content;
      this.logger.log(`DeepSeek API响应成功, 响应长度: ${content.length}`);
      return content;
    } catch (error) {
      this.logger.error(`DeepSeek API 错误: ${error.message}`);

      if (error.response) {
        this.logger.error(
          `错误详情: ${JSON.stringify(error.response.data || {})}`,
        );
      }

      if (
        error.message.includes('402') ||
        error.message.includes('Insufficient Balance')
      ) {
        throw new HttpException(
          'AI服务暂时不可用，请稍后再试。如果问题持续存在，请联系管理员。',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }

      throw new HttpException(
        `无法获取 AI 响应: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateChatTitle(content: string): Promise<string> {
    try {
      this.logger.log(`生成聊天标题, 内容长度: ${content.length}`);

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              '你是一个助手，请根据用户的消息生成一个简短的聊天标题（不超过20个字符）。',
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.5,
        max_tokens: 50,
      });

      const title = response.choices[0].message.content.trim();
      const finalTitle = title.length > 20 ? title.substring(0, 20) : title;
      this.logger.log(`生成标题成功: ${finalTitle}`);
      return finalTitle;
    } catch (error) {
      this.logger.error(`生成标题错误: ${error.message}`);
      if (error.response) {
        this.logger.error(
          `错误详情: ${JSON.stringify(error.response.data || {})}`,
        );
      }
      return '新对话';
    }
  }
}
