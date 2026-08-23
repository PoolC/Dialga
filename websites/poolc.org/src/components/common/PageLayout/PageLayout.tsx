import { ReactNode } from 'react';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

type PagePanelProps = PageShellProps & {
  narrow?: boolean;
};

export const PageShell = ({ children, className }: PageShellProps) => <Shell className={className}>{children}</Shell>;

export const TwoColumnPageShell = ({ children, className }: PageShellProps) => <TwoColumnShell className={className}>{children}</TwoColumnShell>;

export const PagePanel = ({ children, className, narrow = false }: PagePanelProps) => (
  <Panel className={className} data-narrow={narrow}>
    {children}
  </Panel>
);

const Shell = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TwoColumnShell = styled.div`
  position: relative;
  top: 0;
  left: 5%;
  right: 5%;
  display: flex;
  width: 90%;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1366px;
  min-height: 50vh;
  margin: 0 5%;
  padding: 60px 0;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 20px ${colors.gray[1]};
  box-sizing: border-box;

  &[data-narrow='true'] {
    width: auto;
    margin: 0;
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-radius: 16px;
  }
`;
