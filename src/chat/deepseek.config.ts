import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class DeepseekService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('deepseek_api_key'),
      baseURL: this.configService.get('deepseek_api_url'),
    });
    this.model = this.configService.get('deepseek_model');
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
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

      return response.choices[0].message.content;
    } catch (error) {
      console.error(
        'DeepSeek API 错误:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        '无法获取 AI 响应',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateChatTitle(content: string): Promise<string> {
    try {
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
      return title.length > 20 ? title.substring(0, 20) : title;
    } catch (error) {
      console.error('生成标题错误:', error.response?.data || error.message);
      return '新对话';
    }
  }
}
