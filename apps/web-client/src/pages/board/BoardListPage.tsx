import { Tabs } from 'antd';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
import BoardList from '~/components/board/BoardList';
import { createStyles } from 'antd-style';
import { useSearchParams } from '~/hooks/useSearchParams';
import { useHistory } from 'react-router-dom';
import { MENU } from '~/constants/menus';
import { BoardType, getBoardTitleByBoardType } from '~/lib/utils/boardUtil';
import classNames from 'classnames';
import { useAppSelector } from '~/hooks/useAppSelector';

const useStyles = createStyles(({ css }) => ({
  whiteBlock: css`
    &.scope {
      padding: 30px 0;
    }
  `,
  wrapper: css`
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    box-sizing: border-box;
  `,
}));

export default function BoardListPage() {
  const { styles } = useStyles();
  const searchParams = useSearchParams();
  const isLogin = useAppSelector((state) => state.auth.status.isLogin);

  const boardType = (searchParams.get('boardType') ?? 'NOTICE') as BoardType;
  const page = Number(searchParams.get('page') ?? 1);

  const history = useHistory();

  const items: {
    key: BoardType;
    label: string;
    children: JSX.Element;
  }[] = [
    {
      key: 'NOTICE',
      label: getBoardTitleByBoardType('NOTICE'),
      children: <BoardList boardType={'NOTICE'} page={page} />,
    },
    ...(isLogin
      ? [
          {
            key: 'FREE' as BoardType,
            label: getBoardTitleByBoardType('FREE'),
            children: <BoardList boardType={'FREE'} page={page} />,
          },
          {
            key: 'JOB' as BoardType,
            label: getBoardTitleByBoardType('JOB'),
            children: <BoardList boardType={'JOB'} page={page} />,
          },
          {
            key: 'PROJECT' as BoardType,
            label: getBoardTitleByBoardType('PROJECT'),
            children: <BoardList boardType={'PROJECT'} page={page} />,
          },
          {
            key: 'CS' as BoardType,
            label: getBoardTitleByBoardType('CS'),
            children: <BoardList boardType={'CS'} page={page} />,
          },
        ]
      : []),
  ];

  const onTabChange = (key: string) =>
    history.push(`/${MENU.BOARD}?boardType=${key}&page=1`);

  return (
    <Block>
      <WhiteBlock className={classNames(styles.whiteBlock, 'scope')}>
        <div className={styles.wrapper}>
          <Tabs
            items={items}
            defaultActiveKey={boardType}
            onChange={onTabChange}
          />
        </div>
      </WhiteBlock>
    </Block>
  );
}
