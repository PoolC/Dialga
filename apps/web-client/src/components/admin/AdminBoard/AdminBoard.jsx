import ActionButton from '../../common/Buttons/ActionButton';

import { MENU } from '../../../constants/menus';
import {
  BoardListRow,
  ButtonContainer,
  ContentsContainer,
  Table,
  TableHead,
  TitleContainer,
} from './AdminBoard.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';

const AdminBoard = ({ boards, onDeleteBoard }) => {
  const handleDelete = (e, boardID) => {
    e.preventDefault();
    onDeleteBoard(boardID);
  };

  return (
    <WhiteNarrowBlock>
      <TitleContainer>게시판 관리</TitleContainer>
      <ButtonContainer>
        <ActionButton to={`/${MENU.ADMIN}/boards/new`}>
          게시판 생성
        </ActionButton>
      </ButtonContainer>
      <ContentsContainer>
        <Table>
          <thead>
            <TableHead>
              <th className="board_list_head">이름</th>
              <th className="board_list_head hide">URL</th>
              <th className="board_list_head">읽기 권한</th>
              <th className="board_list_head">쓰기 권한</th>
              <th className="board_list_head">동작</th>
            </TableHead>
          </thead>
          <tbody>
            {boards.map((board) => (
              <BoardListRow key={board.id}>
                <td className="board-list-row">{board.name}</td>
                <td className="board-list-row hide">{board.urlPath}</td>
                <td className="board-list-row">{board.readPermission}</td>
                <td className="board-list-row">{board.writePermission}</td>
                <td className="board-list-row">
                  <ActionButton to={`/${MENU.ADMIN}/boards/edit/${board.id}`}>
                    편집
                  </ActionButton>
                  <ActionButton onClick={(e) => handleDelete(e, board.id)}>
                    삭제
                  </ActionButton>
                </td>
              </BoardListRow>
            ))}
          </tbody>
        </Table>
      </ContentsContainer>
    </WhiteNarrowBlock>
  );
};

export default AdminBoard;
