import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space } from 'antd';
import { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, queryKey, useAppQuery } from '~/lib/api-v2';

// CSS
const useStyles = createStyles(() => ({
  dropdownMenu: {
    minHeight: '0px',
    maxHeight: '250px',
    overflowY: 'scroll',
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
  dropdownShape: { display: 'flex', justifyContent: 'center', alignItems: 'center' },

  dropdownAvatar: {
    padding: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19a47d28',
    color: '#716e6e',
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
  const { data }: { data?: NotificationResponse[] } = useAppQuery({
    queryKey: queryKey.notification.unread,

    queryFn: () => NotificationControllerService.getUnreadNotificationsUsingGet(),
    placeholderData: [],
  });

  const Menu = useCallback((menu: ReactNode) => <div className={styles.dropdownMenu}>{menu}</div>, [styles.dropdownMenu]);

  const resultLinkAndDescription = (response: NotificationResponse) => {
    switch (response.notificationType) {
      case 'MESSAGE':
        return {
          link: `/message/${response?.causedById}`,
          description: <p>새로운 쪽지가 왔습니다.</p>,
        };
      case 'BADGE':
        return { link: `/my-page/badge-list`, description: <p>새 뱃지를 받았습니다!</p> };
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
  const dropDownItems = data?.map((dataOne) => ({
    key: `${dataOne.createdAt}-${dataOne?.causedById ?? ''}-${dataOne.notificationType}`,
    label: (
      <Link to={resultLinkAndDescription(dataOne).link}>
        <div>
          <p>{convertDate(dataOne.createdAt ?? '')}</p>
          <div className={styles.dropdownItem}>{resultLinkAndDescription(dataOne).description}</div>
        </div>
      </Link>
    ),
  }));

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} dropdownRender={Menu}>
        <Button shape="circle" className={styles.dropdownButton}>
          <Space size="large" className={styles.dropdownShape}>
            <Badge count={data?.length}>
              <Avatar shape="circle" size="default" icon={<BellOutlined />} className={styles.dropdownAvatar} />
            </Badge>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}
