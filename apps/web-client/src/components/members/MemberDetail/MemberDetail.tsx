import { Suspense } from 'react';
import { useParams } from 'react-router';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import Spinner from '~/components/common/Spinner/Spinner';
import MemberDetailContent from './MemberDetailContent';

const MemberDetail = () => {
  const { memberID } = useParams<{ memberID: string }>();

  return (
    <Block>
      <WhiteBlock>
        <Suspense fallback={<Spinner />}>
          <MemberDetailContent loginId={memberID} />
        </Suspense>
      </WhiteBlock>
    </Block>
  );
};

export default MemberDetail;
