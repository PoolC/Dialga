import { ReactNode } from 'react';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const PageHeader = ({ title, subtitle, actions, className }: PageHeaderProps) => (
  <Header className={className} data-has-actions={Boolean(actions)}>
    <TitleGroup>
      <PageTitle>{title}</PageTitle>
      {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
    </TitleGroup>
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

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${colors.brown[0]};
  font-size: 0.85rem;
  font-weight: 500;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
