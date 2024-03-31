import { Outlet } from '@tanstack/react-router';
import { createStyles } from 'antd-style';
import { PropsWithChildren } from 'react';
import FooterContainer from '~/containers/footer/FooterContainer';
import Header from '../header/Header';

const useStyles = createStyles(({ css }) => ({
  appContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    min-height: 100vh;
    width: 100%;
  `,
  content: css`
    padding-top: 90px;
    flex: 1;

    @media (max-width: 768px) {
      padding-top: 0;
    }
  `,
}));

export default function DefaultLayout({ children }: PropsWithChildren) {
  const { styles } = useStyles();

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.content}>{children}</div>
      <FooterContainer />
    </div>
  );
}
