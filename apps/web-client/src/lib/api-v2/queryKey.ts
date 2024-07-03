import { BoardType } from '~/lib/utils/boardUtil';

export const queryKey = {
  member: {
    hour: ['member.hour'] as const,
    me: ['member.me'] as const,
    all: ['member.all'] as const,
    id: (loginId: string) => ['member.id', loginId] as const,
  },
  badge: {
    badge: ['badge.badge'] as const,
    all: ['badge.all'] as const,
    member: (loginId: string) => ['badge.member', loginId] as const,
  },
  post: {
    all: (boardType: BoardType, page: number) => ['post.all', boardType, page] as const,
    post: (id: number) => ['post.post', id] as const,
    myPosts: (page: number) => ['post.myPosts', page] as const,
  },
  baekjoon: {
    baekjoon: ['baekjoon.baekjoon'] as const,
  },
  poolc: {
    poolc: ['poolc.poolc'] as const,
  },
  project: {
    all: ['project.all'] as const,
  },
  room: {
    range: (start: string, end: string) => ['room.range', start, end] as const,
  },
};
