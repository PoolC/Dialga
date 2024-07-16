import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space } from 'antd';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, useAppQuery } from '~/lib/api-v2';

// CSS
// const useStyles = createStyles(({ css }) => ({
//   dropdownItem: css`
//     display: 'flex';
//     flex-direction: 'row';
//     gap: '4px';
//   `,
//   dropdownButton: css`
//     padding: '0';
//     margin: '0';
//     border: '0';
//   `,
//   dropdownShape: css`
//     display: 'flex';
//     justify-content: 'center';
//     align-items: 'center';
//   `,
//   dropdownAvatar: css`
//     padding: '2px';
//     display: 'flex';
//     justify-content: 'center';
//     align-items: 'center';
//     background-color: '#19a47d28 !important';
//     color: '#716e6e';
//   `,
// }));

// Helper function
const convertDate = (inputDate: Date | string) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const Menu = (menu: ReactNode) => <div style={{ minHeight: '0px', maxHeight: '250px', overflowY: 'scroll' }}>{menu}</div>;

// Components
export default function Notification() {
  // const { styles } = useStyles();
  const { data }: { data?: NotificationResponse[] } = useAppQuery({
    queryKey: ['a'],
    queryFn: NotificationControllerService.getUnreadNotificationsUsingGet,
    // queryFn: NotificationControllerService.getAllNotificationsUsingGet,
  });

  const resultLinkAndDescription = (response: NotificationResponse) => {
    switch (response.notificationType) {
      case 'MESSAGE':
        return {
          link: response?.causedById ? `/message/${response?.causedById}` : `/message`,
          description: (
            <>
              <h4>{response.senderName}</h4>
              <p>님이 쪽지를 보냈습니다.</p>
            </>
          ),
        };
      case 'BADGE':
        return { link: `/my-page/badge-list`, description: <p>새 뱃지를 받았습니다!</p> };
      case 'POST':
        return {
          link: response?.causedById ? `/board/${response?.causedById}` : `/board/${response.postId}`,
          description: (
            <>
              <h4>{response.senderName}</h4>
              <p>님이 댓글을 달았습니다.</p>
            </>
          ),
        };
      case 'RECOMMENT':
        return {
          link: response?.causedById ? `/board/${response?.causedById}` : `/board/${response.parentCommentId}`,
          description: (
            <>
              <h4>{response.senderName}</h4>
              <p>님이 대댓글을 달았습니다.</p>
            </>
          ),
        }; // 기능 안 나오긴 함.
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
          <div
            style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}
            // className={styles.dropdownItem}
          >
            {resultLinkAndDescription(dataOne).description}
          </div>
        </div>
      </Link>
    ),
  }));

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} dropdownRender={Menu}>
        <Button
          shape="circle"
          style={{ padding: '0', margin: '0', border: '0' }}
          // className={styles.dropdownButton}
        >
          <Space
            size="large"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            // className={styles.dropdownShape}
          >
            <Badge count={data?.length}>
              <Avatar
                shape="circle"
                size="default"
                icon={<MessageOutlined />}
                // className={styles.dropdownAvatar}
                style={{
                  padding: '2px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#19a47d28',
                  color: '#716e6e',
                }}
              />
            </Badge>
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}
