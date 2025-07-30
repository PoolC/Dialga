import styled from '@emotion/styled';
// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import { WhiteNarrowBlock } from '../../styles/common/Block.styles';
import getFileUrl from '../../lib/utils/getFileUrl';
import colors from '../../lib/styles/colors';
import { PoolcControllerService, queryKey, useAppSuspenseQuery } from '~/lib/api-v2';

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const Body = styled.div`
  margin: auto;
  margin-bottom: 3rem;
  word-break: keep-all;
  padding: 0 1rem;
  line-height: 1.5rem;
  max-width: 100%;
  overflow: auto;
  color: ${colors.brown[1]};
  p,
  ul,
  ol {
    font-weight: 300;
    font-size: 0.9rem;
    color: ${colors.brown[1]};
  }
  .tui-editor-contents ul li,
  .tui-editor-contents ol li {
    color: ${colors.brown[1]};
  }
  .tui-editor-contents ul,
  .tui-editor-contents ol {
    padding-left: 1.5rem;
  }
  .tui-editor-contents h1,
  .tui-editor-contents h2,
  .tui-editor-contents h3,
  .tui-editor-contents h4,
  .tui-editor-contents h5,
  .tui-editor-contents h6 {
    margin: 0.5rem 0;
    line-height: 1.5rem;
    color: ${colors.brown[1]};
  }
  .tui-editor-contents hr {
    margin: 1rem 0;
  }
  .tui-editor-contents img {
    max-width: 90%;
    margin: 1rem 0;
  }
  .tui-editor-contents p {
    margin: 10px 0;
    color: ${colors.brown[1]};
  }
  a {
    max-width: 100%;
    word-break: break-all;
  }
  th {
    background-color: ${colors.brown[0]};
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    & > span {
      margin-bottom: 0.5rem;
    }
  }
`;

const StyledImage = styled.img`
  width: 70%;
  max-width: 400px;
`;

const Intro = () => {
  const { data: info } = useAppSuspenseQuery({
    queryKey: queryKey.poolc.poolc,
    queryFn: PoolcControllerService.findPoolcUsingGet,
  });

  return (
    <WhiteNarrowBlock>
      <Title>PoolC 소개</Title>
      <Body>
        <Viewer initialValue={info.introduction ?? ''} key={info.introduction ?? ''} />
      </Body>
      <Title>동아리방 위치</Title>
      <StyledImage src={getFileUrl(info.locationUrl)} />
    </WhiteNarrowBlock>
  );
};

export default Intro;
