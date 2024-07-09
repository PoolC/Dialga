import { MessageFilled } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Menu, Space } from 'antd';
import { createStyles } from 'antd-style';
import { BadgeControllerService, MemberControllerService, NotificationControllerService, queryKey, useAppQuery } from '~/lib/api-v2';
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
const useStyles = createStyles(({ css }) => ({
  menu: css`
    .ant-dropdown-menu {
      max-height: 250px;
      overflow: scroll;
    }
  `,
}));

export default function Notification() {
  //

  const { data } = useAppQuery({
    queryKey: ['a'],
    queryFn: NotificationControllerService.getAllNotificationsUsingGet,
  });
  const { D } = useAppQuery({
    queryKey: queryKey.member.me,
    queryFn: MemberControllerService.getMeUsingGet,
  });

  const { data: allBadges } = useAppQuery({
    queryKey: queryKey.badge.all,
    queryFn: BadgeControllerService.getAllBadgeUsingGet,
  });
  console.log('DATA: ', data, D, allBadges);
  //

  const { styles } = useStyles();
  const dropDownItems = [
    {
      key: 1,
      label: '와우',
      createdAt: '',
      notificationType: '',
      parentCommentId: 0,
      postId: 0,
      readStatus: false,
      senderName: '',
    },
  ];
  for (let i = 0; i < 100; i++) {
    dropDownItems.push(dropDownItems[0]);
  }

  return (
    <Dropdown
      menu={{ items: dropDownItems }}
      // dropdownRender={() => <Menu />}
      className={styles.menu}
      style={{ height: '250pz' }}
      // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* <Button shape="circle" className={styles.Avatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '0', border: 'none' }}>
        
        <MessageFilled />
      </Button> */}
      <Button shape="circle" style={{ padding: '0', margin: '0', border: '0' }}>
        <Space size="large">
          <Badge count={99}>
            <Avatar shape="circle" size="middle" icon={<MessageFilled />} />
          </Badge>
        </Space>
      </Button>
    </Dropdown>
  );
}
