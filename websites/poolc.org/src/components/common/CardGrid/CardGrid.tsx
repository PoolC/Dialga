import { ReactNode } from 'react';
import styled from '@emotion/styled';

type CardGridProps = {
  children: ReactNode;
  className?: string;
};

export const CardGrid = ({ children, className }: CardGridProps) => <Grid className={className}>{children}</Grid>;

const Grid = styled.ul`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;
