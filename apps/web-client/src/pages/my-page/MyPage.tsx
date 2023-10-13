import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import {
  Avatar,
  Button,
  List,
  Popover,
  Progress,
  Space,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import { AiFillMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  BsFillPencilFill,
  BsFillQuestionCircleFill,
  BsFillStarFill,
} from 'react-icons/bs';
import { BiSolidUser } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import {
  BadgeControllerService,
  BaekjoonControllerService,
  MemberControllerService,
  queryKey,
  useAppMutation,
  useAppQueries,
} from '~/lib/api-v2';
import { MENU } from '~/constants/menus';
import MyPageGrassSection from '~/components/my-page/MyPageGrassSection';
import classNames from 'classnames';
import { queryClient } from '~/lib/utils/queryClient';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import getFileUrl from '~/lib/utils/getFileUrl';
import { useMessage } from '~/hooks/useMessage';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    box-sizing: border-box;
    &.scope {
      padding: 30px 20px;
    }
  `,
  wrapper: css`
    width: 100%;
    box-sizing: border-box;
  `,
  fullWidth: css`
    width: 100%;
  `,
  link: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-decoration: inherit;
    cursor: pointer;
  `,
  linkInner: css`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  userName: css`
    font-size: 24px;
    font-weight: 700;
    position: relative;

    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 7px;
      background-color: #47be9b;
      opacity: 0.5;
      bottom: 0;
      left: 0;
    }
  `,
  grassTitle: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  badgeTitle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  badgeLink: css`
    font-size: 12px;
    color: #9d9893 !important;
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  badgeButton: css`
    display: flex;
    height: auto;
    min-width: auto;
    padding: 0;
    border: 2px solid transparent;
    &.active {
      border-color: #47be9b;
    }
  `,
}));

export default function MyPage() {
  const { styles } = useStyles();
  const message = useMessage();

  const listData: {
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
  }[] = [
    {
      title: '회원 정보 수정',
      icon: <BiSolidUser size={24} />,
      link: '/my-info',
    },
    {
      title: '내가 쓴 글',
      icon: <BsFillPencilFill size={24} color={'#ffd43b'} />,
      onClick: () => message.info('기능 준비중입니다!'),
    },
    {
      title: '내가 스크랩한 글',
      icon: <BsFillStarFill size={24} color={'#ffa94d'} />,
      onClick: () => message.info('기능 준비중입니다!'),
    },
    {
      title: '쪽지',
      icon: <AiFillMessage size={24} color={'#4dabf7'} />,
      onClick: () => message.info('기능 준비중입니다!'),
    },
  ];

  const [{ data: myHour }, { data: me }, { data: badge }, { data: baekjoon }] =
    useAppQueries({
      queries: [
        {
          queryKey: queryKey.member.hour,
          queryFn: MemberControllerService.getMyActivityTimeUsingGet,
        },
        {
          queryKey: queryKey.member.me,
          queryFn: MemberControllerService.getMeUsingGet,
        },
        {
          queryKey: queryKey.badge.badge,
          queryFn: BadgeControllerService.getMyBadgeUsingGet,
        },
        {
          queryKey: queryKey.baekjoon.baekjoon,
          queryFn: BaekjoonControllerService.getMyBaekjoonUsingGet,
        },
      ],
    });

  const { mutate: selectBadge } = useAppMutation({
    mutationFn: BadgeControllerService.selectBadgeUsingPost,
  });

  const onBadgeButtonClick = (id: number) => {
    if (me?.badge?.id === id) {
      return;
    }

    selectBadge(
      {
        badgeId: id,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(queryKey.member.me).catch(console.log);
        },
      },
    );
  };

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <Space direction={'vertical'} className={styles.fullWidth} size={40}>
          <Space className={styles.wrapper} size={'middle'}>
            <Avatar size={80} src={getProfileImageUrl(me?.profileImageURL)} />
            <Space direction={'vertical'}>
              <Space>
                <Typography.Text className={styles.userName}>
                  {me?.name}님
                </Typography.Text>
                {me?.badge && (
                  <Avatar src={getFileUrl(me?.badge.imageUrl)} alt={me?.name} />
                )}
              </Space>
              <Typography.Text>{me?.introduction}</Typography.Text>
            </Space>
          </Space>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5}>나의 활동시간</Typography.Title>
            <Typography.Text>{myHour?.hour ?? 0}시간 / 6시간</Typography.Text>
            <Progress percent={myHour?.hour ?? 0} strokeColor={'#47be9b'} />
          </Space>
          <Space direction="vertical" className={styles.wrapper}>
            <Typography.Title level={5} className={styles.grassTitle}>
              풀씨 잔디
              <Popover
                title={'풀씨 잔디란?'}
                content={
                  <Space direction={'vertical'}>
                    <Typography.Text>
                      풀씨-백준 익스텐션을 설치하고
                      <br />
                      백준문제를 풀면 풀씨 잔디를 심을 수 있습니다.
                    </Typography.Text>
                    <a
                      href={
                        'https://chrome.google.com/webstore/detail/poolc-baekjoon-hub/doeamknhlolnflkmhbhkagganhjjbefe?hl=ko'
                      }
                      target={'_blank'}
                      rel="noopener noreferrer"
                    >
                      <Button type={'primary'}>익스텐션 설치하러가기 ✨</Button>
                    </a>
                  </Space>
                }
              >
                <BsFillQuestionCircleFill />
              </Popover>
            </Typography.Title>
            {baekjoon?.data && (
              <MyPageGrassSection baekjoonData={baekjoon.data} />
            )}
          </Space>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5} className={styles.badgeTitle}>
              얻은 뱃지
              <Link
                to={`/${MENU.MY_PAGE}/${MENU.MY_PAGE_BADGE_LIST}`}
                className={styles.badgeLink}
              >
                모든 뱃지보기 <span>&gt;</span>
              </Link>
            </Typography.Title>
            {badge?.data && badge.data.length > 0 ? (
              <Space size={[8, 16]} wrap>
                {badge.data.map((el) => (
                  <Button
                    key={el.id}
                    onClick={() => onBadgeButtonClick(el.id!)}
                    shape={'circle'}
                    className={classNames(styles.badgeButton, {
                      active: me?.badge?.id === el.id,
                    })}
                  >
                    <Avatar src={getFileUrl(el.imageUrl)} alt={el.name} />
                  </Button>
                ))}
              </Space>
            ) : (
              <Typography.Text>아직 뱃지가 없습니다.</Typography.Text>
            )}
          </Space>
          <Space direction="vertical" size={0} className={styles.wrapper}>
            <Typography.Title level={5}>나의 메뉴</Typography.Title>
            <List
              size="large"
              className={styles.fullWidth}
              bordered
              dataSource={listData}
              renderItem={(item) =>
                item.link ? (
                  <List.Item onClick={item.onClick}>
                    <Link to={item.link} className={styles.link}>
                      <div className={styles.linkInner}>
                        {item.icon}
                        <Typography.Text>{item.title}</Typography.Text>
                      </div>
                      <IoIosArrowForward size={18} color={'#ced4da'} />
                    </Link>
                  </List.Item>
                ) : (
                  <List.Item onClick={item.onClick} className={styles.link}>
                    <div className={styles.linkInner}>
                      {item.icon}
                      <Typography.Text>{item.title}</Typography.Text>
                    </div>
                    <IoIosArrowForward size={18} color={'#ced4da'} />
                  </List.Item>
                )
              }
            />
          </Space>
        </Space>
      </WhiteBlock>
    </Block>
  );
}
