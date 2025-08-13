// src/common/filters/prisma-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      const target =
        (exception.meta?.target as string[])?.join(', ') || 'field';
        message = target === 'email'
            ? 'This email is already registered'
            : `Unique constraint failed on ${target}`;
    }

    // if (exception.code === 'P2025') {
    //   status = HttpStatus.NOT_FOUND;
    //   message = 'Record not found';
    // }

    // if (exception.code === 'P2003') {
    //   status = HttpStatus.BAD_REQUEST;
    //   message = 'Foreign key constraint failed';
    // }

    response.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status],
    });
  }

}
