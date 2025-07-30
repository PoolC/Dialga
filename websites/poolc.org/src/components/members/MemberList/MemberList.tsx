import { Suspense } from 'react';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import { MemberListHeader, MemberListTitle } from './MemberList.styles';
import Spinner from '~/components/common/Spinner/Spinner';
import MemberListContent from './MemberListContent';

const MemberList = () => (
  <Block>
    <WhiteBlock>
      <MemberListHeader>
        <MemberListTitle>회원 목록</MemberListTitle>
      </MemberListHeader>
      <Suspense fallback={<Spinner />}>
        <MemberListContent />
      </Suspense>
    </WhiteBlock>
  </Block>
);

export default MemberList;
