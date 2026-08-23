import { match } from 'ts-pattern';
import { useSearchParams } from '~/hooks/useSearchParams';
import { BoardType } from '~/lib/utils/boardUtil';
import BoardNormalWriteSection from '~/components/board/BoardNormalWriteSection';

export default function BoardWritePage() {
  const searchParams = useSearchParams();
  const boardType = (searchParams.get('boardType') ?? 'NOTICE') as BoardType;
  const postId = Number(searchParams.get('postId') ?? 0);

  return match(boardType)
    .with('NOTICE', () => <BoardNormalWriteSection postId={postId} boardType="NOTICE" />)
    .with('FREE', () => <BoardNormalWriteSection postId={postId} boardType="FREE" />)
    .with('PROJECT', () => <BoardNormalWriteSection postId={postId} boardType="PROJECT" />)
    .with('EXTERNAL', () => <BoardNormalWriteSection postId={postId} boardType="EXTERNAL" />)
    .with('CAREER', () => <BoardNormalWriteSection postId={postId} boardType="CAREER" />)
    .with('STAFF', () => <BoardNormalWriteSection postId={postId} boardType="STAFF" />)
    .otherwise(() => {
      throw new Error(`invalid boardType: ${boardType}`);
    });
}
