import { NextResponse } from 'next/server';
import { ZodIssue } from 'zod';

export interface BaseResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  errors?: ZodIssue[];
}

class CustomResponse<T = unknown> extends NextResponse<BaseResponse<T> | object> {
  static ok<T>(data: T): CustomResponse<T> {
    return CustomResponse.json(
      {
        success: true,
        status: 200,
        data: data,
        message: 'OK',
      },
      {
        status: 200,
      },
    );
  }

  static empty(message: string = 'OK', statusCode: number = 200): CustomResponse<undefined> {
    return CustomResponse.json(
      {
        success: true,
        status: statusCode,
        data: null,
        message: message,
      },
      {
        status: statusCode,
      },
    );
  }

  static created(): CustomResponse<undefined> {
    return CustomResponse.empty('CREATED', 201);
  }

  static deleted(): CustomResponse<undefined> {
    return NextResponse.json({}, { status: 204 });
  }

  static errors(
    message: string = '서버 에러 입니다.',
    status: number = 500,
  ): CustomResponse<undefined> {
    return CustomResponse.json(
      {
        success: false,
        status,
        data: null,
        message,
      },
      {
        status,
      },
    );
  }

  static zod<T>(status: number = 400, errors: ZodIssue[]): CustomResponse<T> {
    return CustomResponse.json(
      {
        success: false,
        status,
        message: '잘못된 요청 데이터 입니다.',
        data: null,
        errors: errors,
      },
      {
        status,
      },
    );
  }
}

export default CustomResponse;
