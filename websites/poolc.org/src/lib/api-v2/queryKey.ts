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
  book: {
    book: (id: number) => ['book.book', id] as const,
    all: (sorting: string, page?: number) => (page !== undefined ? (['book.all', page, sorting] as const) : (['book.all', sorting] as const)),
    borrowed: ['book.borrowed'] as const,
    search: (sorting: string, keyword: string, searchType: string, page?: number) => ['book.search', sorting, keyword, searchType, page] as const,
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
  conversation: {
    all: ['conversation.all'] as const,
    conversation: (id: string) => ['conversation.conversation', id] as const,
  },
  notification: {
    all: ['notification.all'] as const,
    unread: ['notification.unread'] as const,
  },
};
