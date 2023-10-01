import { useEffect, useState } from 'react';
import AdminBoardForm from '../../../components/admin/AdminBoardForm/AdminBoardForm';
import * as boardAPI from '../../../lib/api/board';
import { withRouter } from 'react-router-dom';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { MENU } from '../../../constants/menus';
import { SUCCESS } from '../../../constants/statusCode';

const AdminBoardFormContainer = ({ match, history, location }) => {
  const boardID = match.params.boardID;

  const [board, setBoard] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (boardID) {
      (async () => {
        const response = await boardAPI.getBoard(boardID);
        setBoard(response.data);
      })();
    }
  }, [boardID]);

  if (boardID && board === null) {
    return null;
  }

  const onCreateBoard = ({
    name,
    urlPath,
    readPermission,
    writePermission,
  }) => {
    if (!name || !urlPath || !readPermission || !writePermission) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    boardAPI
      .createBoard({
        name,
        urlPath,
        readPermission,
        writePermission,
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/boards');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onUpdateBoard = ({
    name,
    urlPath,
    readPermission,
    writePermission,
  }) => {
    if (!name || !urlPath || !readPermission || !writePermission) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    boardAPI
      .updateBoard({
        boardID,
        name,
        urlPath,
        readPermission,
        writePermission,
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/boards');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onShowErrorModal = () => {
    setErrorModalVisible(true);
  };

  const onCloseErrorModal = (e) => {
    e.preventDefault();
    setErrorModalVisible(false);
  };

  const buttons = <ActionButton onClick={onCloseErrorModal}>확인</ActionButton>;

  return (
    <AdminBoardForm
      onCreateBoard={onCreateBoard}
      onUpdateBoard={onUpdateBoard}
      board={board}
      errorMessage={errorMessage}
      buttons={buttons}
      errorModalVisible={errorModalVisible}
      onCloseErrorModal={onCloseErrorModal}
    />
  );
};

export default withRouter(AdminBoardFormContainer);
