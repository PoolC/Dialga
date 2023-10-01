/** -------------------------------------------
 * NOTE.
 * 아래 스타일들에 의존하고 있는 외부 파일들이 많아서 해당 파일은 삭제하지 않음
 * --------------------------------------------
 * */

import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import styled from '@emotion/styled';

export const StyledButton = styled(ActionButton)`
  margin: 0 0 0 15px;
  &.modify {
    background-color: ${colors.brown[1]};
    &:hover {
      background-color: ${colors.brown[0]};
    }
  }
  &.delete {
    background-color: ${colors.red[1]};
    &:hover {
      background-color: ${colors.red[0]};
    }
  }
`;
