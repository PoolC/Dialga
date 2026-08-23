import { Link } from 'react-router-dom';
import { createStyles } from 'antd-style';
import { Image } from 'antd';
import { MENU } from '~/constants/menus';
import getFileUrl from '~/lib/utils/getFileUrl';

const FALLBACK_BOOK_IMAGE = '/main-banner.png';

const useStyles = createStyles(({ css }) => ({
  item: css`
    display: flex;
    width: 236px;
    height: 392px;
    margin: 0;
  `,
  wrapper: css`
    width: 236px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 392px;
    margin: 0;

    &:hover {
      text-decoration: none;
    }
  `,
  coverFrame: css`
    display: flex;
    width: 236px;
    height: 310px;
    align-items: center;
    justify-content: center;
  `,
  bookInfo: css`
    display: flex;
    width: 236px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
  `,
  cover: css`
    box-shadow: 2px 2px 21.7px rgba(115, 115, 115, 0.25);

    .ant-image-img {
      object-fit: cover;
    }
  `,
  title: css`
    display: -webkit-box;
    width: 236px;
    margin: 0;
    overflow: hidden;
    overflow-wrap: break-word;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.35;
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,
  borrowStateCommon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 58px;
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
  `,
  borrowStateDisabled: css`
    background-color: rgba(245, 245, 245, 1);
    color: rgba(130, 121, 113, 1);
  `,
  borrowStateAbled: css`
    background-color: rgba(229, 240, 237, 1);
    color: rgba(48, 177, 138, 1);
  `,
}));
export default function BookCard({
  data: { id, title, imageURL, status },
}: {
  data: { id?: number; title?: string; imageURL?: string; status?: string };
}) {
  const { styles } = useStyles();
  const imageSrc = imageURL ? getFileUrl(imageURL) : FALLBACK_BOOK_IMAGE;

  return (
    <li className={styles.item}>
      <Link to={`/${MENU.BOOKS}/${id}`} className={styles.wrapper}>
        <div className={styles.coverFrame}>
          <Image
            className={styles.cover}
            src={imageSrc}
            alt={`${title}의 이미지`}
            width="236px"
            height="310px"
            fallback={FALLBACK_BOOK_IMAGE}
            preview={false}
          />
        </div>
        <div className={styles.bookInfo}>
          <p className={styles.title}>{title}</p>
          <div className={`${styles.borrowStateCommon} ${status === 'AVAILABLE' ? styles.borrowStateAbled : styles.borrowStateDisabled}`}>{status === 'AVAILABLE' ? '대출가능' : '대출 불가'}</div>
        </div>
      </Link>
    </li>
  );
}
