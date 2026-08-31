import { match } from 'ts-pattern';

export type BoardType = 'NOTICE' | 'FREE' | 'PROJECT' | 'EXTERNAL' | 'CAREER' | 'ETC';

export function getBoardTitleForRequest(boardType: BoardType) {
  return match(boardType)
    .with('NOTICE', () => 'notice')
    .with('FREE', () => 'free')
    .with('PROJECT', () => 'project')
    .with('EXTERNAL', () => 'external')
    .with('CAREER', () => 'career')
    .with('ETC', () => 'etc')
    .exhaustive();
}

export function getBoardTitle(boardType: BoardType) {
  return match(boardType)
    .with('NOTICE', () => '공지 게시판')
    .with('FREE', () => '자유 게시판')
    .with('PROJECT', () => '프로젝트 게시판')
    .with('EXTERNAL', () => '대외활동 게시판')
    .with('CAREER', () => '채용 게시판')
    .with('ETC', () => '기타 게시판')
    .exhaustive();
}

export type BoardWriteMode = 'NEW' | 'EDIT';
