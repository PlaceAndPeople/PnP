import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateUserSchema } from '@/schemas/user';
import { getUser, updateUser } from '@/services/user';
import { z } from 'zod';
import { User } from '@/types/user';

export async function GET(): Promise<CustomResponse<User | undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;

    const user = await getUser(userId);

    return CustomResponse.ok<User>(user);
  } catch (error) {
    console.error('유저 정보 조회 중 에러 발생: ', {
      userId: session?.user.id,
      error: error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function PATCH(request: NextRequest): Promise<CustomResponse<undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;
    const data = updateUserSchema.parse(await request.json());

    await updateUser(userId, data);

    console.info('사용자 정보 업데이트:', {
      userId,
      updatedFields: Object.keys(data),
      timestamp: new Date().toISOString(),
    });

    return CustomResponse.empty();
  } catch (error) {
    console.error('사용자 정보 업데이트 중 에러 발생: ', {
      userId: session?.user.id,
      data: await request.json(),
      error: error,
    });

    if (error instanceof z.ZodError) {
      return CustomResponse.zod('잘못된 요청 데이터입니다.', 400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}