import { BoardType } from '~/lib/utils/boardUtil';

export const queryKey = {
  member: {
    hour: ['member.hour'] as const,
    me: ['member.me'] as const,
  },
  badge: {
    badge: ['badge.badge'] as const,
    all: ['badge.all'] as const,
  },
  post: {
    all: (boardType: BoardType, page: number) =>
      ['post.all', boardType, page] as const,
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
};
