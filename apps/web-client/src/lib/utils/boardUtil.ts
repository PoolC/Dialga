import { match } from 'ts-pattern';

export type BoardType = 'NOTICE' | 'FREE' | 'JOB' | 'PROJECT' | 'CS';

export function getBoardTitleByBoardType(boardType: BoardType) {
  return match(boardType)
    .with('NOTICE', () => '공지게시판')
    .with('FREE', () => '자유게시판')
    .with('JOB', () => '취업게시판')
    .with('PROJECT', () => '사람구해요~')
    .with('CS', () => 'CS게시판')
    .exhaustive();
}

export type BoardWriteMode = 'NEW' | 'EDIT';
