import AdminBoard from '../../../components/admin/AdminBoard/AdminBoard';
import { useEffect, useState } from 'react';
import * as boardAPI from '../../../lib/api/board';
import { SUCCESS } from '../../../constants/statusCode';

const AdminBoardContainer = () => {
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await boardAPI.getBoards();
      setBoards(response.data.data);
    })();
  }, []);

  if (boards === null) {
    return null;
  }

  const onDeleteBoard = (boardID) => {
    boardAPI.deleteBoard(boardID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setBoards(boards.filter((board) => board.id !== boardID));
      }
    });
  };

  return <AdminBoard boards={boards} onDeleteBoard={onDeleteBoard} />;
};

export default AdminBoardContainer;
