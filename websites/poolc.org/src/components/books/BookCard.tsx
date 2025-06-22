import { Link } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { Image } from 'antd';
import { MENU } from '~/constants/menus';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    width: 218px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 27px; */
    justify-content: space-between;
    height: 405px;

    &:hover {
      text-decoration: none;
    }
  `,
  cover: css`
    box-shadow: 2px 2px 21.7px rgba(115, 115, 115, 0.25); // x축, y축, 흐림 정도, 색상
  `,
  title: css`
    width: 218px;
    overflow-wrap: break-word;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
  `,
  borrowStateCommon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 63px;
    height: 30px;
    color: white;
    border-radius: 11px;
  `,
  borrowStateDisabled: css`
    background-color: rgba(217, 217, 217, 1);
  `,
  borrowStateAbled: css`
    background-color: rgba(72, 189, 155, 1);
  `,
}));
export default function BookCard({ data: { id, title, imageURL, status } }: { data: { id?: number; title?: string; imageURL?: string; status?: string } }) {
  const { styles } = useStyles();
  return (
    <Link to={`/${MENU.BOOKS}/${id}`} className={styles.wrapper}>
      <div>
        <Image className={styles.cover} src={getFileUrl(imageURL)} alt={`${title}의 이미지`} width="218px" height="301px" />
      </div>

      <p className={styles.title}>{title}</p>
      <div className={`${styles.borrowStateCommon} ${status === 'AVAILABLE' ? styles.borrowStateAbled : styles.borrowStateDisabled}`}>{status === 'AVAILABLE' ? '대출가능' : '대출 불가'}</div>
      {/* <Button type="primary" className={status === 'AVAILABLE' ? styles.borrowBtn : styles.borrowBtnDisabled}>
        {status === 'AVAILABLE' ? '대출가능' : '대출 불가'}
      </Button> */}
      {/* <button type="button">{`${status === 'AVAILABLE' ? '대출' : '대출 불가'}`}</button> */}
    </Link>
  );
}
