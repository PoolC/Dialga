import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../../lib/styles/colors';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ActionButton from '../../common/Buttons/ActionButton';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const PostFormBlock = styled.div`
  flex: 4;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  border-radius: 50px;
  padding: 40px 40px 60px 40px;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${colors.gray[1]};
  margin-bottom: 2rem;
  width: 90%;
`;

const EditorWrapper = styled.div`
  width: 90%;
`;

const PostButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StyledActionButton = styled(ActionButton)`
  height: 2rem;
  margin: 0 0 0 1rem;
  &.file {
    background-color: ${colors.mint[2]};
    &:hover {
      background-color: ${colors.mint[3]};
    }
  }
  &.submit {
    background-color: ${colors.mint[2]};
    &:hover {
      background-color: ${colors.mint[3]};
    }
  }
  &.cancel {
    background-color: ${colors.red[0]};
    &:hover {
      background-color: ${colors.red[1]};
    }
  }
`;

const BoardName = styled.h2`
  display: flex;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
  width: 90%;
`;

const PostForm = ({ title, body }) => {
  const editorRef = useRef();
  function onEditorChange(e) {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    console.log(markdownContent);
    const HTMLContent = editorInstance.getHtml();
    console.log(HTMLContent);
    //setBody(markdownContent);
  }
  return (
    <PostFormBlock>
      <BoardName>공지사항</BoardName>
      <TitleInput placeholder="제목을 입력하세요" value={title} />
      <EditorWrapper>
        <Editor
          initialValue={body}
          ref={editorRef}
          onChange={(e) => onEditorChange(e)}
          height="500px"
        />
      </EditorWrapper>
      <PostButtonContainer>
        <StyledActionButton className="file">파일 첨부</StyledActionButton>
        <StyledActionButton className="submit">작성</StyledActionButton>
        <StyledActionButton className="cancel">취소</StyledActionButton>
      </PostButtonContainer>
    </PostFormBlock>
  );
};

export default PostForm;
