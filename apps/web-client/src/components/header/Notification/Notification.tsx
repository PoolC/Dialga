import { MessageFilled, MessageOutlined, MessageTwoTone } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Space } from 'antd';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
// import { createStyles } from 'antd-style';
import { NotificationControllerService, NotificationResponse, useAppQuery } from '~/lib/api-v2';
// import { createStyles } from 'antd-style';

// const useStyles = createStyles(({ css }) => ({
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
const convertDate = (inputDate: Date | string) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const Menu = (menu: ReactNode) => <div style={{ minHeight: '0px', maxHeight: '250px', overflowY: 'scroll' }}>{menu}</div>;
export default function Notification() {
  //

  const { data }: { data?: NotificationResponse[] } = useAppQuery({
    queryKey: ['a'],
    queryFn: NotificationControllerService.getAllNotificationsUsingGet,
  });
  const unreadData = data?.filter((dataOne) => !dataOne.readStatus);

  // const { styles } = useStyles();
  const dropDownItems = unreadData
    // data
    // ?.filter((dataOne) => dataOne.readStatus)
    ?.map((dataOne) => ({
      key: 1,
      label: (
        <Link to="/notification/1">
          <div>
            <p>{convertDate(dataOne.createdAt ?? '')}</p>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
              <h4>{dataOne.senderName}</h4> <p>{dataOne.notificationType}</p>
            </div>
          </div>
        </Link>
      ),
      createdAt: '2024-07-08T11:34:38.871318',
      notificationType: '님이 쪽지를 보냈습니다.',
      parentCommentId: null,
      postId: null,
      readStatus: true,
      senderName: '어드민',
    }));
  // for (let i = 1; i < 100; i++) {
  //   dropDownItems.push({ ...dropDownItems[0], key: i });
  // }

  return (
    <div>
      <Dropdown menu={{ items: dropDownItems }} dropdownRender={Menu}>
        <Button shape="circle" style={{ padding: '0', margin: '0', border: '0' }}>
          <Space size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Badge count={unreadData?.length}>
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
                  // border: '1px solid #EEEFEF',
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
