import { ReactNode } from 'react';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';
import { media } from '~/styles/responsive';

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  actionsMobileHidden?: boolean;
  className?: string;
};

export const PageHeader = ({ title, subtitle, actions, actionsMobileHidden = false, className }: PageHeaderProps) => (
  <Header className={className} data-has-actions={Boolean(actions)} data-actions-mobile-hidden={actionsMobileHidden}>
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

  ${media.compact} {
    width: 100%;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
  }
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

  ${media.compact} {
    flex-direction: column;
    align-items: stretch;
    gap: 22px;

    &[data-actions-mobile-hidden='true'] {
      gap: 0;

      > div:last-child {
        display: none;
      }
    }
  }
`;

const TitleGroup = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;

  ${media.compact} {
    align-items: center;
    text-align: center;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  ${media.compact} {
    align-items: flex-start;
    justify-content: center;
  }
`;
