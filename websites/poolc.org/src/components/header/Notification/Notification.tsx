import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space, Spin } from 'antd';
import { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { assert } from '~/lib/utils/assert';
import { MENU } from '~/constants/menus';
import { queryClient } from '~/lib/utils/queryClient';

// CSS
const useStyles = createStyles(() => ({
  dropdownMenu: {
    minHeight: '0px',
    maxHeight: '250px',
    overflowY: 'auto',
    padding: '5px',
  },
  dropdownItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
  },

  dropdownButton: {
    padding: '0',
    margin: '0',
    border: '0',
  },
  dropdownShape: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownAvatar: {
    padding: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19a47d28',
    color: '#716e6e',
  },

  notificationMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f1f3f5',
    borderRadius: '8px',
  },
  notificationHeader: {
    padding: '5px',
    paddingBottom: '0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '1rem',
    boxSizing: 'border-box',
  },
  notificationTitle: {
    fontSize: '16px',
  },
  notificationSpinnerWrapper: {
    width: '19px',
    height: '19px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationClearButton: {
    color: '#19a47d85',
    fontSize: '12px',
    background: '#ffffff',
    padding: '2px',
    borderRadius: '8px',
  },
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

  const Menu = useCallback(
    (menu: ReactNode) => (
      <div className={styles.notificationMenu}>
        <div className={styles.notificationHeader}>
          <p className={styles.notificationTitle}>Notification</p>
          {isSpinning ? (
            <div className={styles.notificationSpinnerWrapper}>
              <Spin size="small" className={styles.notificationSpinner} />
            </div>
          ) : (
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
              Clear All
            </Button>
          )}
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
    ],
  );

  const resultLinkAndDescription = (response: NotificationResponse) => {
    switch (response.notificationType) {
      case 'MESSAGE':
        return {
          link: `/${MENU.MESSAGE}`, // `/message/${response?.causedById}`,
          description: <p>새로운 쪽지가 왔습니다.</p>,
        };
      case 'BADGE':
        return { link: `/${MENU.MY_PAGE}/${MENU.MY_PAGE_BADGE_LIST}`, description: <p>새 뱃지를 받았습니다!</p> };
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
              <div>
                <p>{convertDate(dataOne.createdAt ?? '')}</p>
                <div className={styles.dropdownItem}>{resultLinkAndDescription(dataOne).description}</div>
              </div>
            </Link>
          ),
        }))
      : [{ key: 'empty', label: <p>새로운 알림이 없습니다.</p> }];

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} popupRender={Menu}>
        <Button shape="circle" className={styles.dropdownButton}>
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
