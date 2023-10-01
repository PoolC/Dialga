import {
  Badge,
  BadgeControllerService,
  MemberControllerService,
  queryKey,
  useAppMutation,
  useAppQuery,
} from '~/lib/api-v2';
import {
  Avatar,
  Button,
  Checkbox,
  Modal,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { createStyles } from 'antd-style';
import { useMessage } from '~/hooks/useMessage';

/* ---------------------------
 * MEMBER BADGE MANAGEMENT TABLE
 * ---------------------------- */
type DataType = {
  name: string;
  department: string;
  studentId: string;
  loginId: string;
  email: string;
};

export default function AdminMemberBadgeManagement() {
  // data
  const { data: allMembersData } = useAppQuery({
    queryKey: queryKey.member.all,
    queryFn: MemberControllerService.getAllMembersUsingGet,
  });

  const dataSource: DataType[] =
    allMembersData?.data.map((member) => ({
      name: member.name ?? '',
      department: member.department ?? '',
      studentId: member.studentID ?? '',
      loginId: member.loginID ?? '',
      email: member.email ?? '',
    })) ?? [];

  const [showMemberBadgeListModal, setShowMemberBadgeListModal] =
    useState(false);
  const [activeMemberId, setActiveMemberId] = useState('');

  // render
  const columns: ColumnsType<DataType> = [
    {
      key: 'name',
      title: '이름',
      render: (_, { name }) => name,
    },
    {
      key: 'department',
      title: '학과',
      render: (_, { department }) => department,
    },
    {
      key: 'studentId',
      title: '학번',
      render: (_, { studentId }) => studentId,
    },
    {
      key: 'loginId',
      title: '아이디',
      render: (_, { loginId }) => loginId,
    },
    {
      key: 'edit',
      title: '뱃지목록 조회',
      render: (_, { loginId }) => (
        <Button
          type={'primary'}
          onClick={() => {
            setActiveMemberId(loginId);
            setShowMemberBadgeListModal(true);
          }}
        >
          뱃지목록
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={'loginId'}
      />
      {showMemberBadgeListModal && (
        <MemberBadgeListModal
          onOk={() => setShowMemberBadgeListModal(false)}
          onCancel={() => setShowMemberBadgeListModal(false)}
          loginId={activeMemberId}
        />
      )}
    </>
  );
}
/* ---------------------------
 * BADGE LIST MODAL
 * ---------------------------- */
const useMemberBadgeListModalStyles = createStyles(({ css }) => ({
  badgeName: css`
    font-weight: 700;
  `,
  badgeDesc: css`
    font-weight: 300;
  `,
  badgeWrap: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  `,
}));

function MemberBadgeListModal({
  onOk: _onOk,
  onCancel,
  loginId,
}: {
  onOk: () => void;
  onCancel: () => void;
  loginId: string;
}) {
  // states
  const { styles } = useMemberBadgeListModalStyles();
  const message = useMessage();

  const { data: memberBadgeList } = useAppQuery({
    queryKey: queryKey.badge.member(loginId),
    queryFn: () => BadgeControllerService.getMemberBadgeUsingGet({ loginId }),
  });

  const [badgeOwnList, setBadgeOwnList] = useState<
    { id: number; own: boolean }[]
  >([]);

  const { mutate: assignBadge } = useAppMutation({
    mutationFn: BadgeControllerService.assignBadgeUsingPost,
  });

  // actions
  const onToggleCheckBox = (id: number) => {
    setBadgeOwnList((list) =>
      list.map((item) => (item.id === id ? { ...item, own: !item.own } : item)),
    );
  };

  const onOk = () => {
    if (!memberBadgeList?.data) {
      return;
    }
    const isChanged = Boolean(
      badgeOwnList.find(
        (badge) =>
          memberBadgeList.data!.find(({ id }) => id === badge.id)?.own !==
          badge.own,
      ),
    );

    if (!isChanged) {
      _onOk();
      return;
    }

    assignBadge(
      {
        loginId,
        assignBadgeRequest: {
          data: badgeOwnList,
        },
      },
      {
        onSuccess() {
          message.success('수정되었습니다.');
          _onOk();
        },
      },
    );
  };

  // effects
  useEffect(() => {
    if (memberBadgeList?.data) {
      setBadgeOwnList(
        memberBadgeList.data.map((badge) => ({
          id: badge.id!,
          own: Boolean(badge.own),
        })),
      );
    }
  }, [memberBadgeList]);

  // render
  const renderBadgeTooltipTitle = (badge: Badge) => {
    return (
      <div>
        <span className={styles.badgeName}>{badge.name}</span>
        <br />
        <span className={styles.badgeDesc}>{badge.description}</span>
      </div>
    );
  };

  return (
    <Modal open onCancel={onCancel} onOk={onOk}>
      <Space direction={'vertical'}>
        <Typography.Title level={4}>뱃지 목록 조회</Typography.Title>
        <Space direction={'vertical'}>
          <Typography.Text>{loginId}님의 뱃지목록입니다.</Typography.Text>
          <div className={styles.badgeWrap}>
            {memberBadgeList?.data?.map((badge) => (
              <Checkbox
                onChange={() => onToggleCheckBox(badge.id!)}
                checked={badgeOwnList.find(({ id }) => id === badge.id)?.own}
                key={badge.id}
              >
                <Tooltip key={badge.id} title={renderBadgeTooltipTitle(badge)}>
                  <Avatar src={badge.imageUrl} alt={badge.name} />
                </Tooltip>
              </Checkbox>
            ))}
          </div>
        </Space>
      </Space>
    </Modal>
  );
}
