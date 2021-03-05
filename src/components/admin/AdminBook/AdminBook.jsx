import ActionButton from '../../common/Buttons/ActionButton';
import React from 'react';
import { MENU } from '../../../constants/menus';
import {
  AdminBooksBlock, BookListRow,
  ButtonContainer,
  ContentsContainer, StyledActionButton, StyledImage,
  Table,
  TableHead,
  TitleContainer,
} from './AdminBook.styles';

const AdminBook = ({ books, onDeleteBook }) => {
  const handleDelete = (e, bookID) => {
    e.preventDefault();
    onDeleteBook(bookID);
  };
  return (
    <AdminBooksBlock>
      <TitleContainer>도서 관리</TitleContainer>
      <ButtonContainer>
        <ActionButton to={`/${MENU.ADMIN}/books/new`}>도서 생성</ActionButton>
      </ButtonContainer>
      <ContentsContainer>
        <Table>
          <thead>
            <TableHead>
              <th className="book_list_head">표지</th>
              <th className="book_list_head">제목</th>
              <th className="book_list_head">저자</th>
              <th className="book_list_head">상태</th>
              <th className="book_list_head">동작</th>
            </TableHead>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookListRow key={book.id}>
                <td className="book-list-row">
                  <StyledImage src={book.imageURL} />
                </td>
                <td className="book-list-row">{book.title}</td>
                <td className="book-list-row">{book.author}</td>
                <td className="book-list-row">
                  {book.status === 'AVAILABLE' ? '이용 가능' : '대출중'}
                </td>
                <td className="book-list-row">
                  <StyledActionButton
                    to={`/${MENU.ADMIN}/books/edit/${book.id}`}
                  >
                    편집
                  </StyledActionButton>
                  <StyledActionButton onClick={(e) => handleDelete(e, book.id)}>
                    삭제
                  </StyledActionButton>
                </td>
              </BookListRow>
            ))}
          </tbody>
        </Table>
      </ContentsContainer>
    </AdminBooksBlock>
  );
};

export default AdminBook;
