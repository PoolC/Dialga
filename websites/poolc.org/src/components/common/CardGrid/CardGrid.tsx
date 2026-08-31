import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { media } from '~/styles/responsive';

type CardGridProps = {
  children: ReactNode;
  className?: string;
};

export const CardGrid = ({ children, className }: CardGridProps) => <Grid className={className}>{children}</Grid>;

const Grid = styled.ul`
  display: grid;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr));
  gap: 16px;
  align-items: stretch;
  justify-content: center;
  margin: 0;
  padding: 0;

  > * {
    max-width: 100%;
    min-width: 0;
    justify-self: center;
  }

  ${media.compact} {
    gap: 14px;
  }

  ${media.phone} {
    gap: 12px;
  }
`;
