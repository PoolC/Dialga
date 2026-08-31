import styled from '@emotion/styled';
import { Block as BaseBlock, PagePanel, TwoColumnPageShell } from '~/components/common/PageLayout/PageLayout';
import { media } from '~/styles/responsive';

export const Block = BaseBlock;
export const TwoColumnsContainerBlock = TwoColumnPageShell;
export const WhiteBlock = styled(PagePanel)`
  & > .block_title {
    margin-bottom: 3rem;
  }

  ${media.compact} {
    & > .block_title {
      width: 100%;
      margin-bottom: 2rem;
      color: inherit;
      font-size: 2rem;
      text-align: center;
    }
  }
`;
export const WhiteNarrowBlock = styled(PagePanel)`
  flex: 1;
  padding: 40px 20px;
`;
