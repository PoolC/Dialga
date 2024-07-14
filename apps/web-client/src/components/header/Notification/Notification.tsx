import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space } from 'antd';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, useAppQuery } from '~/lib/api-v2';

// const useStyles = createStyles(({ css }) => ({
//   dropdownMenu:css`

//   `,
//   avatarButton: css`
//     width: 40px;
//     height: 40px;
//     padding: 0;
//   `,
//   logo: css`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     gap: 5px;
//     margin-right: 10px;
//   `,
// }));
// const useStyles = createStyles(({ css }) => ({
//   menu: css`
//     .ant-dropdown-menu {
//       height: 250px;
//       overflow: scroll;
//     }
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
  const { data }: { data?: NotificationResponse[] } = useAppQuery({
    queryKey: ['a'],
    queryFn: NotificationControllerService.getUnreadNotificationsUsingGet,
    // queryFn: NotificationControllerService.getAllNotificationsUsingGet,
  });

  const resultLinkAndDescription = (response: NotificationResponse) => {
    switch (response.notificationType) {
      case 'MESSAGE':
        return {
          link: `/message`,
          description: (
            <>
              <h4>{response.senderName}</h4>
              <p>님이 쪽지를 보냈습니다.</p>
            </>
          ),
        };
      case 'BADGE':
        return { link: `/my-page/badge-list`, description: <p>새 뱃지를 받았습니다!</p> };
      case 'COMMENT':
        return {
          link: `/board/${response.postId}`,
          description: (
            <>
              <h4>{response.senderName}</h4>
              <p>님이 댓글을 달았습니다.</p>
            </>
          ),
        };
      case 'RECOMMENT':
        return {
          link: `/board/${response.parentCommentId}`,
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
    key: `${dataOne.createdAt}-${dataOne.senderName}-${dataOne.notificationType}`, // 수정해야함.
    label: (
      <Link to={resultLinkAndDescription(dataOne).link}>
        <div>
          <p>{convertDate(dataOne.createdAt ?? '')}</p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>{resultLinkAndDescription(dataOne).description}</div>
        </div>
      </Link>
    ),
  }));

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} dropdownRender={Menu}>
        <Button shape="circle" style={{ padding: '0', margin: '0', border: '0' }}>
          <Space size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Badge count={data?.length}>
              <Avatar
                shape="circle"
                size="default"
                icon={<MessageOutlined />}
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
