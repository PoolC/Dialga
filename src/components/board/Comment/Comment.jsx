import React from 'react';
import styled from 'styled-components';
import colors from '../../../lib/styles/colors';
import { getFullCurrentDateString } from '../../../lib/utils/getDateString';
import ActionButton from '../../common/Buttons/ActionButton';

const CommentBlock = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;
  cursor: default;
  &:hover {
    background-color: ${colors.gray[1]};
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  min-width: 4rem;
  padding-left: 0.5rem;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  font-size: 0.9rem;
  align-items: center;
  word-break: keep-all;
  line-height: 1.2rem;
  @media (max-width: 576px) {
    margin: 0.5rem 0;
    padding-left: 0.5rem;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 3rem;
  & > button {
    margin: 0;
    background-color: ${colors.red[0]};
    &:hover {
      background-color: ${colors.red[1]};
    }
  }
  @media (max-width: 576px) {
    flex: 1;
  }
`;

const Date = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
  padding-right: 0.5rem;
  @media (max-width: 576px) {
    justify-content: start;
  }
`;

const DateButtonConatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
  min-width: 8rem;
  padding-right: 0.5rem;
  @media (max-width: 576px) {
    justify-content: space-between;
    padding-left: 0.5rem;
  }
`;

const Comment = ({ comment, onDeleteComment }) => {
  const { commentId, memberName, body, createdAt } = comment;

  const handleDelete = (e) => {
    e.preventDefault();
    onDeleteComment(commentId);
  };

  return (
    <CommentBlock>
      <Author>{memberName}</Author>
      <Body>{body}</Body>
      <DateButtonConatiner>
        <Date>{getFullCurrentDateString(createdAt)}</Date>
        <Button>
          <ActionButton onClick={handleDelete}>삭제</ActionButton>
        </Button>
      </DateButtonConatiner>
    </CommentBlock>
  );
};

export default Comment;
