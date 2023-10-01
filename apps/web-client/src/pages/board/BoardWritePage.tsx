import { useSearchParams } from '~/hooks/useSearchParams';
import { match } from 'ts-pattern';
import { BoardType } from '~/lib/utils/boardUtil';
import BoardNormalWriteSection from '~/components/board/BoardNormalWriteSection';
import BoardJobWriteSection from '~/components/board/BoardJobWriteSection';

export default function BoardWritePage() {
  const searchParams = useSearchParams();
  const boardType = (searchParams.get('boardType') ?? 'NOTICE') as BoardType;
  const postId = Number(searchParams.get('postId') ?? 0);

  return match(boardType)
    .with('NOTICE', () => (
      <BoardNormalWriteSection postId={postId} boardType={'NOTICE'} />
    ))
    .with('FREE', () => (
      <BoardNormalWriteSection postId={postId} boardType={'FREE'} />
    ))
    .with('JOB', () => <BoardJobWriteSection postId={postId} />)
    .with('PROJECT', () => (
      <BoardNormalWriteSection postId={postId} boardType={'PROJECT'} />
    ))
    .with('CS', () => (
      <BoardNormalWriteSection postId={postId} boardType={'CS'} />
    ))
    .otherwise(() => {
      throw new Error(`invalid boardType: ${boardType}`);
    });
}
