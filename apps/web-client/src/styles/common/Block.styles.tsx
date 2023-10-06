import colors from '../../lib/styles/colors';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const useStyles = createStyles(({ css }) => ({
  twoColumnsContainerBlock: css`
    position: relative;
    top: 0;
    width: 90%;
    left: 5%;
    right: 5%;
    display: flex;
    margin: 0;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
  block: css`
    position: relative;
    display: flex;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    justify-content: center;
  `,
  whiteBlock: css`
    width: 90%;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 20px ${colors.gray[1]};
    border-radius: 50px;
    padding: 60px 0;
    min-height: 50vh;
    max-width: 1366px;
    & > .block_title {
      margin-bottom: 3rem;
    }
  `,
  whiteNarrowBlock: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 20px ${colors.gray[1]};
    flex: 1;
    border-radius: 50px;
    padding: 40px 20px;
    min-height: 50vh;
  `,
}));

export const TwoColumnsContainerBlock = ({
  children,
  className,
  ...rest
}: DivProps) => {
  const { styles } = useStyles();
  return (
    <div
      className={classNames(className, styles.twoColumnsContainerBlock)}
      {...rest}
    >
      {children}
    </div>
  );
};
export const Block = ({ children, className, ...rest }: DivProps) => {
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.block)} {...rest}>
      {children}
    </div>
  );
};

export const WhiteBlock = ({ children, className, ...rest }: DivProps) => {
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.whiteBlock)} {...rest}>
      {children}
    </div>
  );
};

export const WhiteNarrowBlock = ({
  children,
  className,
  ...rest
}: DivProps) => {
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.whiteNarrowBlock)} {...rest}>
      {children}
    </div>
  );
};
