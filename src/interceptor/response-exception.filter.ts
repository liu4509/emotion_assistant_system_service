import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ResponseExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };

    try {
      response
        .json({
          code: exception.getStatus(),
          message: 'fail',
          data: res?.message?.join(',') || exception.message,
        })
        .end();
    } catch (error) {
      response
        .json({
          code: exception.getStatus(),
          message: 'fail',
          data: exception.message,
        })
        .end();
    }
  }
}
