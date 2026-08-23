import { ReactNode } from 'react';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';

type PageHeaderProps = {
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const PageHeader = ({ title, actions, className }: PageHeaderProps) => (
  <Header className={className} data-has-actions={Boolean(actions)}>
    <PageTitle>{title}</PageTitle>
    {actions && <Actions>{actions}</Actions>}
  </Header>
);

export const PageTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${colors.brown[1]};
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.25;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;

  &[data-has-actions='false'] {
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    &[data-has-actions='false'] {
      align-items: center;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;
