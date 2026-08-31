import { InstagramOutlined, MailTwoTone, MessageTwoTone } from '@ant-design/icons';
import styled from '@emotion/styled';
import { PagePanel } from '~/components/common/PageLayout/PageLayout';
import { PageTitle } from '~/components/common/PageHeader/PageHeader';
import colors from '~/lib/styles/colors';

const Title = styled(PageTitle)`
  margin-bottom: 3rem;
`;

const SNSList = styled.ul`
  display: grid;
  width: min(92%, 840px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 767px) {
    width: 90%;
    grid-template-columns: 1fr;
  }
`;

const SNSItem = styled.li`
  position: relative;
  display: flex;
  min-height: 190px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 24px;
  border-radius: 20px;
  background: ${colors.mint[0]};
  box-shadow: 0 0 10px ${colors.gray[1]};
  box-sizing: border-box;
  overflow: hidden;
  transition: 0.25s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px ${colors.gray[2]};
  }
`;

const IconBadge = styled.div`
  display: flex;
  width: 68px;
  height: 68px;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;
  border-radius: 50%;
  background-color: #ffffff;
  color: ${colors.mint[2]};
  box-shadow: inset 0 0 0 1px ${colors.mint[1]};
  font-size: 1.85rem;
  font-weight: 800;
`;

const SNSName = styled.h4`
  margin: 0 0 0.65rem;
  color: ${colors.brown[1]};
  font-size: 1.05rem;
  font-weight: 700;
`;

const SNSContent = styled.a`
  color: ${colors.brown[1]};
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.4;
  text-align: center;
  text-decoration: none;
  word-break: break-word;

  &:hover {
    color: ${colors.brown[1]};
    text-decoration: underline;
  }
`;

const SNS = () => (
  <PagePanel narrow>
    <Title>SNS</Title>
    <SNSList>
      <SNSItem>
        <IconBadge>
          <MessageTwoTone twoToneColor={colors.mint[2]} />
        </IconBadge>
        <SNSName>카카오톡 채널</SNSName>
        <SNSContent as="span">풀씨 PoolC</SNSContent>
      </SNSItem>
      <SNSItem>
        <IconBadge>
          <InstagramOutlined />
        </IconBadge>
        <SNSName>인스타그램</SNSName>
        <SNSContent href="https://www.instagram.com/poolc.official/" rel="noreferrer" target="_blank">
          @poolc.official
        </SNSContent>
      </SNSItem>
      <SNSItem>
        <IconBadge>
          <MailTwoTone twoToneColor={colors.mint[2]} />
        </IconBadge>
        <SNSName>이메일</SNSName>
        <SNSContent href="mailto:poolc.official@gmail.com">poolc.official@gmail.com</SNSContent>
      </SNSItem>
    </SNSList>
  </PagePanel>
);

export default SNS;
