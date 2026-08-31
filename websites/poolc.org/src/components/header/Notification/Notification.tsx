import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space, Spin } from 'antd';
import { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { assert } from '~/lib/utils/assert';
import { MENU } from '~/constants/menus';
import { queryClient } from '~/lib/utils/queryClient';
import { media } from '~/styles/responsive';

// CSS
const useStyles = createStyles(({ css }) => ({
  dropdownMenu: css`
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
    padding: 8px;
    box-sizing: border-box;

    .ant-dropdown-menu {
      padding: 0;
      background: transparent;
      box-shadow: none;
    }

    .ant-dropdown-menu-item {
      padding: 0 !important;
      border-radius: 6px;
    }

    .ant-dropdown-menu-item:hover {
      background: #f1fbf8;
    }
  `,
  dropdownItem: css`
    p {
      margin: 0;
    }
  `,
  dropdownButton: css`
    margin: 0;
    padding: 0;
    border: 0;
  `,
  dropdownShape: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  dropdownAvatar: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: #19a47d28;
    color: #716e6e;
  `,
  notificationMenu: css`
    display: flex;
    width: min(320px, calc(100vw - 24px));
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #e7e0d7;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 12px 28px rgba(76, 55, 34, 0.14);

    ${media.mobile} {
      width: min(280px, calc(100vw - 32px));
    }
  `,
  notificationHeader: css`
    display: flex;
    width: 100%;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: 1px solid #edf3f1;
    box-sizing: border-box;
  `,
  notificationTitle: css`
    margin: 0;
    color: #4c3722;
    font-size: 15px;
    font-weight: 800;
  `,
  notificationSpinnerWrapper: css`
    display: flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
  `,
  notificationSpinner: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  notificationClearButton: css`
    height: 30px;
    padding: 0 8px;
    border: 0;
    background: transparent;
    color: #16896d;
    font-size: 12px;
    font-weight: 700;
  `,
  notificationLink: css`
    display: block;
    color: #4c3722;
    text-decoration: none;

    &:hover {
      color: #4c3722;
      text-decoration: none;
    }
  `,
  notificationItem: css`
    display: flex;
    min-height: 60px;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    padding: 10px 12px;
  `,
  notificationDate: css`
    color: #8b8178;
    font-size: 12px;
    line-height: 1.2;
  `,
  emptyState: css`
    display: flex;
    min-height: 112px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #8b8178;
    font-size: 13px;

    svg {
      color: #b6dcd1;
      font-size: 22px;
    }
  `,
}));

// Helper function
const convertDate = (inputDate: Date | string) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Components
export default function Notification() {
  const { styles } = useStyles();
  const { data, isFetching } = useAppQuery({
    queryKey: queryKey.notification.unread,
    queryFn: async () => {
      const res = await NotificationControllerService.getUnreadNotificationsUsingGet();
      // NOTE: 204의 경우 아무것도 반환되지 않는다. 해당 케이스를 위한 처리
      return res ?? [];
    },
    initialData: {
      responses: [],
      unreadCount: 0,
    },
  });
  const { mutate: updateNotiReadStatus } = useAppMutation({
    mutationFn: NotificationControllerService.viewNotificationUsingPost,
  });
  const { mutate: updateAllNotiReadStatus, isPending: isPendingAllNotiRead } = useAppMutation({
    mutationFn: NotificationControllerService.viewAllNotificationsUsingPost,
  });

  assert(data, 'data is undefined');
  // 스피너 용 변수
  const isSpinning = isFetching || isPendingAllNotiRead;
  const hasUnreadNotifications = (data.unreadCount ?? 0) > 0;

  const Menu = useCallback(
    (menu: ReactNode) => (
      <div className={styles.notificationMenu}>
        <div className={styles.notificationHeader}>
          <p className={styles.notificationTitle}>알림</p>
          {isSpinning ? (
            <div className={styles.notificationSpinnerWrapper}>
              <Spin size="small" className={styles.notificationSpinner} />
            </div>
          ) : hasUnreadNotifications ? (
            <Button
              htmlType="button"
              size="small"
              className={styles.notificationClearButton}
              onClick={() => {
                updateAllNotiReadStatus(undefined, {
                  onSuccess() {
                    queryClient.invalidateQueries({ queryKey: queryKey.notification.unread });
                  },
                });
              }}
            >
              모두 읽음
            </Button>
          ) : null}
        </div>
        <div className={styles.dropdownMenu}>{menu}</div>
      </div>
    ),
    [
      styles.dropdownMenu,
      updateAllNotiReadStatus,
      isSpinning,
      styles.notificationClearButton,
      styles.notificationHeader,
      styles.notificationMenu,
      styles.notificationSpinner,
      styles.notificationSpinnerWrapper,
      styles.notificationTitle,
      hasUnreadNotifications,
    ],
  );

  const resultLinkAndDescription = (response: NotificationResponse) => {
    switch (response.notificationType) {
      case 'MESSAGE':
        return {
          link: `/${MENU.MESSAGE}`, // `/message/${response?.causedById}`,
          description: <p>새로운 쪽지가 왔습니다.</p>,
        };
      case 'POST':
        return {
          link: `/board/${response?.causedById}`,
          description: (
            <>
              {/* <h4>{response.senderName}</h4> */}
              <p>게시물에 댓글이 달렸습니다.</p>
            </>
          ),
        };
      // case 'RECOMMENT':
      //   return {
      //     link: response?.causedById ? `/board/${response?.causedById}` : `/board/${response.parentCommentId}`,
      //     description: (
      //       <>
      //         <h4>{response.senderName}</h4>
      //         <p>님이 대댓글을 달았습니다.</p>
      //       </>
      //     ),
      //   }; // 기능 안 나오긴 함.
      default:
        return { link: '/', description: <p>오류가 발생했습니다</p> };
    }
  };

  const dropDownItems =
    (data.unreadCount ?? 0) > 0
      ? (data.responses ?? []).map((dataOne) => ({
          key: `${dataOne.createdAt}-${dataOne.causedById ?? ''}-${dataOne.notificationType}`,
          label: (
            <Link
              to={resultLinkAndDescription(dataOne).link}
              className={styles.notificationLink}
              onClick={() => {
                updateNotiReadStatus(
                  { notificationId: dataOne.notificationId! },
                  {
                    onSuccess() {
                      queryClient.invalidateQueries({ queryKey: queryKey.notification.unread });
                    },
                  },
                );
              }}
            >
              <div className={styles.notificationItem}>
                <span className={styles.notificationDate}>{convertDate(dataOne.createdAt ?? '')}</span>
                <div className={styles.dropdownItem}>{resultLinkAndDescription(dataOne).description}</div>
              </div>
            </Link>
          ),
        }))
      : [{ key: 'empty', disabled: true, label: <div className={styles.emptyState}><BellOutlined /><span>새로운 알림이 없습니다.</span></div> }];

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} popupRender={Menu} placement="bottomRight" trigger={['click']} align={{ offset: [0, 8] }}>
        <Button shape="circle" className={styles.dropdownButton} aria-label="알림 열기">
          <Space size="large" className={styles.dropdownShape}>
            <Badge count={data.unreadCount ?? 0}>
              <Avatar shape="circle" size="default" icon={<BellOutlined />} className={styles.dropdownAvatar} />
            </Badge>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}
