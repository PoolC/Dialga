import { useEffect, useState } from 'react';
import * as bookAPI from '../../../lib/api/book';
import AdminBookForm from '../../../components/admin/AdminBookForm/AdminBookForm';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { SUCCESS } from '../../../constants/statusCode';

const AdminBookFormContainer = ({ match, history }) => {
  const bookID = match.params.bookID;

  const [book, setBook] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (bookID) {
      (async () => {
        const response = await bookAPI.getBook(bookID);
        setBook(response.data);
      })();
    }
  }, [bookID]);

  if (bookID && book === null) {
    return null;
  }

  const onCreateBook = ({ title, author, imageURL, info }) => {
    if (!title || !author || !imageURL || !info) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    bookAPI
      .createBook({ title, author, imageURL, info })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/books');
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

  const onUpdateBook = ({ title, author, imageURL, info }) => {
    if (!title || !author || !imageURL || !info) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    bookAPI
      .updateBook({ bookID, title, author, imageURL, info })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/books');
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

  return (
    <AdminBookForm
      onCreateBook={onCreateBook}
      onUpdateBook={onUpdateBook}
      book={book}
      errorMessage={errorMessage}
      buttons={buttons}
      errorModalVisible={errorModalVisible}
      onCloseErrorModal={onCloseErrorModal}
    />
  );
};

export default withRouter(AdminBookFormContainer);
