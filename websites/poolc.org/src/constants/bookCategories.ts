export const BOOK_CATEGORY_OPTIONS = [
  { value: 'PROGRAMMING', label: '프로그래밍' },
  { value: 'ALGORITHM', label: '알고리즘' },
  { value: 'SYSTEM', label: '시스템' },
  { value: 'DATA', label: '데이터' },
  { value: 'DESIGN', label: '설계' },
] as const;

export type BookCategory = (typeof BOOK_CATEGORY_OPTIONS)[number]['value'];
export type BookCategoryTab = 'ALL' | BookCategory;

export const BOOK_CATEGORY_TABS: { key: BookCategoryTab; label: string }[] = [
  { key: 'ALL', label: '전체' },
  ...BOOK_CATEGORY_OPTIONS.map(({ value, label }) => ({ key: value, label })),
];

export const getBookCategoryLabel = (category?: BookCategory) => BOOK_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? '미분류';
