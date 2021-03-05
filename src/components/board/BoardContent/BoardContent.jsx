import React from 'react';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import {
  BoardContentBlock,
  PageList,
  PostListHead,
  PostListRow,
  PostListTable,
  StyledLink,
} from './BoardContent.styles';

const BoardContent = ({ selectedMenu, posts }) => {
  return (
    <BoardContentBlock>
      <header className="post_list_header">
        <h2 className="post_list_title">{selectedMenu.name}</h2>
        <ActionButton to={`/${MENU.POST}/new/${selectedMenu.id}`}>
          글쓰기
        </ActionButton>
      </header>
      <PostListTable>
        <thead>
          <PostListHead>
            <th className="post_list_head_title">제목</th>
            <th className="post_list_head_author">작성자</th>
            <th className="post_list_head_date">작성일</th>
          </PostListHead>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostListRow key={post.id}>
              <td className="post-list-row-title">
                <StyledLink to={`/${MENU.POST}/${post.id}`}>
                  {post.title}
                </StyledLink>
                <span className="post_list_row_comment_count">
                  {post.commentsCount}
                </span>
              </td>
              <td className="post-list-row-author">{post.author}</td>
              <td className="post-list-row-date">{post.date}</td>
            </PostListRow>
          ))}
        </tbody>
      </PostListTable>
      <PageList>
        <li className="page_item page_selected">1</li>
        <li className="page_item">2</li>
        <li className="page_item">3</li>
      </PageList>
    </BoardContentBlock>
  );
};

export default BoardContent;
