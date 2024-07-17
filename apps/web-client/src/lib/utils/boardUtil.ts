import { match } from 'ts-pattern';

export type BoardType = 'NOTICE' | 'FREE' | 'JOB' | 'PROJECT' | 'CS';

export function getBoardTitleByBoardType(boardType: BoardType) {
  return match(boardType)
    .with('NOTICE', () => 'notice')
    .with('FREE', () => 'free')
    .with('JOB', () => 'job')
    .with('PROJECT', () => 'project')
    .with('CS', () => 'cs')
    .exhaustive();
}

export type BoardWriteMode = 'NEW' | 'EDIT';
