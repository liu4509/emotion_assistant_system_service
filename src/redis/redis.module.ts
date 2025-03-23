import { Global, Module, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface redisCfg {
  socket: {
    host: string;
    port: number;
  };
  database: number;
}

const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<redisCfg>().build();

// 抽离出 工厂函数 便于测试
export const createRedisClient = async (config: redisCfg) => {
  const logger = new Logger(RedisModule.name);
  const client = createClient(config);
  // 错误处理
  client.on('error', (err) => {
    logger.error(`Redis 正尝试重新连接，请检查 Redis 是否异常关闭：${err}`);
  });
  client.on('connect', () => {
    logger.log(`Redis 连接成功`);
  });
  await client.connect();
  return client;
};
// 这里用 @Global() 把它声明为全局模块，这样只需要在 AppModule 里引入，别的模块不用引入也可以注入 RedisService
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: createRedisClient,
      inject: [MODULE_OPTIONS_TOKEN],
    },
  ],
  exports: [RedisService, 'REDIS_CLIENT'], // 导出 REDIS_CLIENT
})
export class RedisModule extends ConfigurableModuleClass {}
