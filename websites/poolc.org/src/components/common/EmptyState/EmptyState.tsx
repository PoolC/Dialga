import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';

type EmptyStateProps = {
  children: string;
};

export const EmptyState = ({ children }: EmptyStateProps) => <EmptyStateBlock>{children}</EmptyStateBlock>;

const EmptyStateBlock = styled.li`
  display: flex;
  width: 100%;
  min-height: 200px;
  align-items: center;
  justify-content: center;
  color: ${colors.brown[0]};
  font-size: 0.85rem;
  font-weight: 300;
  text-align: center;
  word-break: keep-all;
`;
