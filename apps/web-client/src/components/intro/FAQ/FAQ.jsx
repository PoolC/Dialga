import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';

const Title = styled.h2`
  margin-bottom: 4rem;
`;

const FAQBlock = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding: 0 2rem;
`;

const Q = styled.span`
  color: ${colors.red[0]};
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const A = styled.span`
  color: ${colors.mint[2]};
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const Content = styled.p`
  display: flex;
  font-weight: 300;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  line-height: 1.2rem;
  word-break: keep-all;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    flex-direction: column;
    & > span {
      margin-bottom: 0.5rem;
    }
  }
`;

const FAQ = () => {
  return (
    <WhiteNarrowBlock>
      <Title>자주 묻는 질문</Title>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          프로그래밍 초보자도 지원할 수 있나요?
        </Content>
        <Content>
          <A>A</A>
          현재 동아리에 소속된 부원들도 모두 처음에는 초보자였습니다.
          <br />
          풀씨는 함께 프로그래밍을 배우기 위한 동아리이기 때문에 실력에 상관
          없이 지원하셔도 괜찮습니다.
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          풀씨는 어떤 활동을 하나요?
        </Content>
        <Content>
          <A>A</A>
          프로그래밍과 관련된 모든 활동을 합니다.
          <br />
          기초 프로그래밍 세미나, 웹 세미나, 게임 제작 세미나, 논문 스터디 등이
          진행되어 왔습니다.
          <br />
          자세한 활동 내용을 확인하고 싶으시다면, 홈페이지 상단 Projects 탭이나
          Seminars 탭을 클릭해주세요.
          <br />각 페이지에서 지금까지 진행했던 프로젝트 및 세미나&스터디의
          내용을 확인하실 수 있습니다.
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          동아리 부원 중 타과생 비율은 어느정도 되나요?
        </Content>
        <Content>
          <A>A</A>
          매 학기마다 타과생 비율이 달라지기 때문에 정확한 수치를 말씀드리는
          것은 어렵습니다.
          <br />
          그러나 타과생 비율이 낮지 않습니다. 단과대와 학과에 상관 없이
          지원하셔도 괜찮습니다. :)
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          세미나&스터디의 장소와 시간은 어떻게 되나요?
        </Content>
        <Content>
          <A>A</A>
          세미나&스터디마다 다르지만, 일반적으로 장소는 풀씨 동아리방에서
          진행됩니다.
          <br />
          시간은 해당 세미나&스터디에 참여한 부원들이 협의를 통해 정합니다.
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          게임 개발과 기획을 해 본 적이 없는데 게임 제작 활동에 참여할 수
          있나요?
        </Content>
        <Content>
          <A>A</A>
          현재 게임 제작 활동에 참여중인 부원들도 처음에는 게임 관련 경험이 없는
          경우가 많았습니다.
          <br />
          직접 참여하면서 배우는 것이 가능하니, 풀씨에 가입하셔서 같이 배우셔도
          좋습니다.
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          풀씨의 활동은 게임 제작 위주로 진행되나요?
        </Content>
        <Content>
          <A>A</A>
          그렇지 않습니다.
          <br />
          게임 제작 활동이 풀씨의 중요한 활동인 것은 맞습니다.
          <br />
          그러나 그 외에 알고리즘 문제 풀이(백준 등), 다양한 세미나 및 스터디,
          프로젝트 등의 활동도 높은 비중을 두고 진행하고 있습니다.
        </Content>
      </FAQBlock>
      <FAQBlock>
        <Content>
          <Q>Q</Q>
          풀씨에 구인 공고 게시 또는 홍보를 하고 싶은데, 어떻게 하면 되나요?
        </Content>
        <Content>
          <A>A</A>
          홈페이지 하단에 회장의 연락처와 동아리 이메일이 있습니다.
          <br />
          해당 연락처로 문의를 주시면, 최대한 빠르게 답변드리도록 하겠습니다. :)
        </Content>
      </FAQBlock>
    </WhiteNarrowBlock>
  );
};

export default FAQ;
