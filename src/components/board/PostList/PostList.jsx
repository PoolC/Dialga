import React from 'react';
import { MENU } from '../../../constants/menus';
import { getFullCurrentDateString } from '../../../lib/utils/getDateString';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import {
  PageList,
  PostListHead,
  PostListHeader,
  PostListRow,
  PostListTable,
  StyledLink,
} from './PostList.styles';

const PostList = ({ selectedMenu, posts }) => {
  return (
    <WhiteNarrowBlock>
      <PostListHeader>
        <h2 className="post_list_title">{selectedMenu?.name}</h2>
        <ActionButton to={`/${MENU.POST}/new/${selectedMenu?.id}`}>
          글쓰기
        </ActionButton>
      </PostListHeader>
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
            <PostListRow key={post.postId}>
              <td className="post-list-row-title">
                <StyledLink to={`/${MENU.POST}/${post.postId}`}>
                  {post.title}
                </StyledLink>
                <span className="post_list_row_comment_count">
                  [{post.comments.length}]
                </span>
              </td>
              <td className="post-list-row-author">{post.memberName}</td>
              <td className="post-list-row-date">
                {getFullCurrentDateString(post.createdAt)}
              </td>
            </PostListRow>
          ))}
        </tbody>
      </PostListTable>
      <PageList>
        <li className="page_item page_selected">1</li>
        <li className="page_item">2</li>
        <li className="page_item">3</li>
      </PageList>
    </WhiteNarrowBlock>
  );
};

export default PostList;
