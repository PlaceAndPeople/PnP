import { NotFoundError } from '@/errors';
import { prisma } from '@/lib/server';
/**
 * 숙소 정보를 조회한다
 *
 * @param {number} roomId 방 아이디
 *
 * @returns {Promise<Room>} 방 정보
 */
export async function getRoom(roomId: number) {
  const room = await prisma.room.findUnique({
    relationLoadStrategy: 'join',
    where: { id: roomId },
    select: {
      id: true,
      airbnbLink: true,
      title: true,
      hostId: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      thumbnail: true,
      location: true,
      price: true,
      latitude: true,
      longitude: true,
      capacity: true,
      checkIn: true,
      checkOut: true,
      checkInType: true,
      roomTags: {
        select: {
          tag: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          imageLink: true,
          orientation: true,
        },
      },
      rules: {
        select: {
          rule: true,
        },
      },
      amenities: {
        select: {
          amenity: true,
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError();
  }

  return room;
}