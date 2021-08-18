import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostForm from '../../../components/board/PostForm/PostForm';
import { MENU } from '../../../constants/menus';
import * as boardAPI from '../../../lib/api/board';
import * as postAPI from '../../../lib/api/post';
import * as authAPI from '../../../lib/api/auth';
import Spinner from '../../../components/common/Spinner/Spinner';
import { SUCCESS } from '../../../constants/statusCode';

const PostFormContainer = ({ match, history }) => {
  const { boardID } = match.params;
  const { postID } = match.params;

  const member = useSelector((state) => state.auth);
  const {
    status: { isLogin },
    user: { isAdmin },
  } = member;

  const [loading, setLoading] = useState(true);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    boardAPI.getBoard(boardID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setSelectedMenu(res.data);
        if (res.data.writePermission === 'ADMIN' && !isAdmin) {
          history.push(`/${MENU.FORBIDDEN}`);
          return;
        }
        if (res.data.writePermission === 'MEMBER' && !isLogin) {
          history.push(`/${MENU.FORBIDDEN}`);
          return;
        }
        if (!postID) {
          setLoading(false);
        }
      }
    });
    if (postID) {
      postAPI.getPost(postID).then((res) => {
        if (res.status === SUCCESS.OK) {
          setPost(res.data);
          authAPI
            .loadUser()
            .then((user) => {
              if (
                user.status === SUCCESS.OK &&
                user.data.isActivated === false
              ) {
                history.push(`/${MENU.FORBIDDEN}`);
                return;
              }
              if (
                user.status === SUCCESS.OK &&
                user.data.loginID !== res.data.writerLoginId &&
                !user.data.isAdmin
              ) {
                history.push(`/${MENU.FORBIDDEN}`);
                return;
              }
            })
            .catch((e) => {
              console.error(e.message);
              history.push(`/${MENU.FORBIDDEN}`);
            });
          setLoading(false);
        }
      });
    }
  }, [boardID, postID, history, isAdmin, isLogin]);

  if (selectedMenu == null) {
    return null;
  }

  const onCreatePost = ({ title, body, fileList }) => {
    postAPI
      .createPost({ title, body, boardID, fileList })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          const { postId } = res.data;
          history.push(
            `/${MENU.BOARDS}/${selectedMenu?.urlPath}/${MENU.POST}/${postId}`,
          );
        }
      })
      .catch((e) => {
        console.error(e.message);
        history.push(`/${MENU.FORBIDDEN}`);
      });
  };

  const onUpdatePost = ({ title, body, fileList }) => {
    postAPI
      .updatePost({ title, body, postID, fileList })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push(
            `/${MENU.BOARDS}/${selectedMenu?.urlPath}/${MENU.POST}/${postID}`,
          );
        }
      })
      .catch((e) => {
        console.error(e.message);
        history.push(`/${MENU.FORBIDDEN}`);
      });
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <PostForm
          member={member}
          post={post}
          selectedMenu={selectedMenu}
          onCreatePost={onCreatePost}
          onUpdatePost={onUpdatePost}
        />
      )}
    </>
  );
};

export default withRouter(PostFormContainer);
