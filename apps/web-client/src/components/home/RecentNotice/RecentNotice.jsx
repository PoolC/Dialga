import { MENU } from '../../../constants/menus';
import { getFullCurrentDateString } from '../../../lib/utils/getDateString';
import {
  MainNoticeContents,
  NoticeContainerTitle,
  RecentNoticeBlock,
  RecentNoticeCardDate,
  RecentNoticeCardTitle,
  RecentNoticeItem,
  RecentNoticeList,
  StyledLink,
} from './RecentNotice.styles';

const RecentNotice = ({ notices }) => {
  return (
    <RecentNoticeBlock>
      <NoticeContainerTitle>
        <StyledLink to="/boards/notice">Recent Notices</StyledLink>
      </NoticeContainerTitle>
      <MainNoticeContents>
        <RecentNoticeList>
          {notices?.map((notice) => (
            <RecentNoticeItem key={notice.postId}>
              <RecentNoticeCardTitle>
                <StyledLink
                  to={`/${MENU.BOARDS}/notice/${MENU.POST}/${notice.postId}`}
                >
                  {notice.title}
                </StyledLink>
              </RecentNoticeCardTitle>
              <RecentNoticeCardDate>
                {getFullCurrentDateString(notice.createdAt)}
              </RecentNoticeCardDate>
            </RecentNoticeItem>
          ))}
        </RecentNoticeList>
      </MainNoticeContents>
    </RecentNoticeBlock>
  );
};

export default RecentNotice;
