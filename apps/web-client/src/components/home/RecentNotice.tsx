import { PushpinTwoTone } from '@ant-design/icons';
import { MENU } from '~/constants/menus';
import { MainNoticeContents, NoticeContainerTitle, RecentNoticeBlock, RecentNoticeCardDate, RecentNoticeCardTitle, RecentNoticeItem, RecentNoticeList, StyledLink } from './RecentNotice.styles';
import { dayjs } from '~/lib/utils/dayjs';
import { PostResponse } from '~/lib/api-v2';

const RecentNotice = ({ notices }: { notices: PostResponse[] }) => (
    <RecentNoticeBlock>
      <NoticeContainerTitle>
        <StyledLink to="/board">
          <PushpinTwoTone twoToneColor="#47be9b" />
          Recent Notices
        </StyledLink>
      </NoticeContainerTitle>
      <MainNoticeContents>
        <RecentNoticeList>
          {notices.map((notice) => (
            <RecentNoticeItem key={notice.postId}>
              <RecentNoticeCardTitle>
                <StyledLink to={`/${MENU.BOARD}/${notice.postId}`}>{notice.title}</StyledLink>
              </RecentNoticeCardTitle>
              <RecentNoticeCardDate>{dayjs(notice.createdAt).format('YYYY. MM. DD')}</RecentNoticeCardDate>
            </RecentNoticeItem>
          ))}
        </RecentNoticeList>
      </MainNoticeContents>
    </RecentNoticeBlock>
  );

export default RecentNotice;
