import useInput from '../../../hooks/useInput';
import Input from '../../common/Input/Input';
import { notEmptyValidation } from '../../../lib/utils/validation';
import {
  StyledActionButton,
  StyledForm,
  StyledSelect,
  TitleContainer,
} from './AdminBoardForm.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import Modal from '../../common/Modal/Modal';
import throttle from '../../../lib/utils/throttle';

const AdminBoardForm = ({
  board,
  onCreateBoard,
  onUpdateBoard,
  errorMessage,
  buttons,
  errorModalVisible,
  onCloseErrorModal,
}) => {
  const [name, onChangeName] = useInput(
    board ? board.name : '',
    notEmptyValidation,
  );
  const [urlPath, onChangeUrlPath] = useInput(
    board ? board.urlPath : '',
    notEmptyValidation,
  );
  const [readPermission, onChangeReadPermission] = useInput(
    board ? board.readPermission : 'PUBLIC',
    notEmptyValidation,
  );
  const [writePermission, onChangeWritePermission] = useInput(
    board ? board.writePermission : 'PUBLIC',
    notEmptyValidation,
  );

  const handleCreate = throttle((e) => {
    e.preventDefault();
    onCreateBoard({ name, urlPath, readPermission, writePermission });
  }, 1000);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateBoard({ name, urlPath, readPermission, writePermission });
  };

  return (
    <>
      <Modal
        contents={errorMessage}
        buttons={buttons}
        visible={errorModalVisible}
        onConfirm={onCloseErrorModal}
        onCancel={onCloseErrorModal}
      />
      <WhiteNarrowBlock>
        <TitleContainer>게시판 생성</TitleContainer>
        <StyledForm>
          <Input
            valueText={name}
            labelText="게시판 이름"
            typeText="text"
            nameText="name"
            onChangeFunc={onChangeName}
            placeholderText="ex) 공지사항"
          />
          <Input
            valueText={urlPath}
            labelText="url"
            typeText="text"
            nameText="urlPath"
            onChangeFunc={onChangeUrlPath}
            placeholderText="ex) notice"
          />
          <label>읽기 권한</label>
          <StyledSelect
            value={readPermission}
            onChange={onChangeReadPermission}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
            <option value="PUBLIC">PUBLIC</option>
          </StyledSelect>
          <label>쓰기 권한</label>
          <StyledSelect
            value={writePermission}
            onChange={onChangeWritePermission}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
            <option value="PUBLIC">PUBLIC</option>
          </StyledSelect>
          {board ? (
            <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton>
          ) : (
            <StyledActionButton onClick={handleCreate}>제출</StyledActionButton>
          )}
        </StyledForm>
      </WhiteNarrowBlock>
    </>
  );
};

export default AdminBoardForm;
