import { match } from 'ts-pattern';

export type BoardType = 'NOTICE' | 'FREE' | 'JOB' | 'PROJECT' | 'CS';

export function getBoardTitleByBoardType(boardType: BoardType) {
  return match(boardType)
    .with('NOTICE', () => '공지 게시판')
    .with('FREE', () => '자유 게시판')
    .with('JOB', () => '취업 게시판')
    .with('PROJECT', () => '프로젝트 게시판')
    .with('CS', () => 'CS 게시판')
    .exhaustive();
}

export type BoardWriteMode = 'NEW' | 'EDIT';
