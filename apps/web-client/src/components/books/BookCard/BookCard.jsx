import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import { useEffect, useState } from 'react';
import BookModalContainer from '../../../containers/book/BookModal/BookModalContainer';
import getFileUrl from '../../../lib/utils/getFileUrl';
import { isAuthorizedRole } from '~/lib/utils/checkRole';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const openCard = keyframes`
  from {
    height: 0;
  }
  to {
    height: 100px;
  }
`;

const closeCard = keyframes`
  from {
    height: 100px;
  }
  to {
    height: 0;
    }
`;

const BookCardBlock = styled.li`
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.mint[1]};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 80%;
  box-shadow: 0px -10px 10px ${colors.gray[1]};
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;
  ${(props) => !props.open && 'border-radius: 20px;'}

  &:hover {
    opacity: 80%;
    transition: opacity 0.3s;
  }
`;

const BookInfoContainer = styled.div`
  flex: 3;
  margin: 0 10px;
`;

const BookTitle = styled.p`
  width: 90%;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 5px;
  word-break: keep-all;
  line-height: 1.1rem;
`;

const BookAuthor = styled.p`
  width: 90%;
  font-weight: 300;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const BookInfo = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  flex: 1;
  align-items: center;
  @media (max-width: 576px) {
    margin: auto;
    text-align: center;
  }
`;

const BookStatus = styled.p`
  display: flex;
  justify-content: flex-end;
  min-width: 5rem;
  font-weight: 500;
  font-size: 0.9rem;
  flex: 1;
  & > .fa-caret-down,
  & > .fa-caret-up {
    margin-left: 8px;
  }
`;

const disappearAnimation = css`
  animation-name: ${closeCard};
`;

const BookContentsContainer = styled.div`
  background-color: ${colors.mint[0]};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 80%;
  box-shadow: 0 10px 10px ${colors.gray[1]};
  padding: 10px 20px;
  transition: 0.3s;
  display: ${(props) => (props.open ? 'flex' : 'none')};

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${openCard};
  animation-fill-mode: forwards;

  ${(props) => props.disappear && disappearAnimation}
`;

const BookImageContainer = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  justify-content: start;
`;

const BookImage = styled.img`
  width: 70px;
  height: auto;
`;

const BookDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  margin-bottom: 5px;
`;

const BookDetailContainer = styled.div`
  display: flex;
  flex: 7;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Borrower = styled.p`
  font-size: 0.8rem;
  display: flex;
  flex: 1;
  align-items: center;
  @media (max-width: 576px) {
    margin: auto;
  }
  & > span {
    color: ${colors.brown[0]};
    margin-right: 5px;
  }
`;

const BorrowDate = styled.p`
  font-size: 0.8rem;
  display: flex;
  flex: 1;
  align-items: center;
  @media (max-width: 576px) {
    margin: auto;
    text-align: center;
  }
  & > span {
    color: ${colors.brown[0]};
    margin-right: 5px;
  }
`;

const BookDetailButton = styled(ActionButton)`
  flex: 0.5;
  height: 2rem;
  margin: auto;
  @media (max-width: 576px) {
    flex: 2;
  }
`;

const BookCard = ({ book, isLogin, user, onBorrowBook, onReturnBook }) => {
  const { id, title, author, imageURL, status, info, borrower, borrowDate } =
    book;

  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
  }, [open]);

  const handleCard = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (status === 'AVAILABLE') {
      onBorrowBook(id, status);
    } else {
      onReturnBook(id, status);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <BookModalContainer
        visible={modalVisible}
        bookTitle={title}
        status={status}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <BookCardBlock>
        <BookCardContainer open={open} animate={animate} onClick={handleCard}>
          <BookInfoContainer>
            <BookTitle>{title}</BookTitle>
            <BookAuthor>{author}</BookAuthor>
          </BookInfoContainer>
          <BookStatus>
            {status === 'AVAILABLE' ? '이용 가능' : '대출중'}
            {open ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </BookStatus>
        </BookCardContainer>
        <BookContentsContainer open={open}>
          <BookImageContainer>
            <BookImage src={getFileUrl(imageURL)} alt="book_image" />
          </BookImageContainer>
          <BookDetailContainer>
            <BookDetailInfoContainer>
              {status !== 'AVAILABLE' && (
                <Borrower>
                  <span>대출자</span> {borrower.name}
                </Borrower>
              )}
              {status !== 'AVAILABLE' && (
                <BorrowDate>
                  <span>대출일</span> {borrowDate}
                </BorrowDate>
              )}
              {info && <BookInfo>[{info}]</BookInfo>}
            </BookDetailInfoContainer>
            {isLogin &&
              isAuthorizedRole(user.role) &&
              (status === 'AVAILABLE' ? (
                <BookDetailButton onClick={handleModalOpen}>
                  대출
                </BookDetailButton>
              ) : (
                user.memberId === borrower?.loginID && (
                  <BookDetailButton onClick={handleModalOpen}>
                    반납
                  </BookDetailButton>
                )
              ))}
          </BookDetailContainer>
        </BookContentsContainer>
      </BookCardBlock>
    </>
  );
};

export default BookCard;
