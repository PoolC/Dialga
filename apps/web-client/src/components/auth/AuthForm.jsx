import { useState } from 'react';
import profileImagePlaceholders from '../../constants/profileImagePlaceholders';
import RegisterModalContainer from '../../containers/auth/RegisterModalContainer/RegisterModalContainer';
import useInput from '../../hooks/useInput';
import getFileUrl from '../../lib/utils/getFileUrl';
import {
  emailValidation,
  idValidation,
  notEmptyValidation,
  passwordValidation,
  phoneNumberValidation,
  withdrawCheckValidation,
} from '../../lib/utils/validation';
import { Block, WhiteBlock } from '../../styles/common/Block.styles';
import {
  FormList,
  FormListHeader,
  ProfileImage,
  ProfileImageSelect,
  ProfileImageSelectContainer,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledSelect,
  StyledTextarea,
  SubmitButton,
  Warning,
  WithdrawalButton,
} from './AuthForm.styles';
import { MENU } from '../../constants/menus';
import throttle from '../../lib/utils/throttle';

const textMap = {
  login: '로그인',
  register: '회원가입',
  update: '회원 정보 수정',
};

export const Input = ({
  valueText,
  labelText,
  typeText,
  nameText,
  error,
  onChangeFunc,
  placeholderText,
  disabledCondition,
}) => {
  const message = '형식이 올바르지 않습니다.';
  return (
    <>
      <StyledLabel htmlFor={nameText}>
        {labelText}
        <Warning error={error}>{message}</Warning>
      </StyledLabel>
      <StyledInput
        value={valueText}
        type={typeText}
        name={nameText}
        id={nameText}
        disabled={disabledCondition}
        error={error}
        onChange={onChangeFunc}
        placeholder={placeholderText}
      />
    </>
  );
};

const AuthForm = ({
  history,
  type,
  onSubmit,
  message,
  onChangeMessage,
  modalVisible,
  handleModalOpen,
  handleModalClose,
  userInfo,
  onUpdateMemberRoleBySelf,
  roles,
  onWithdraw,
}) => {
  const headerText = textMap[type];

  const [id, onChangeId, idError] = useInput(
    userInfo ? userInfo.loginID : '',
    idValidation,
  );
  const [password, onChangePassword, passwordError] = useInput(
    '',
    passwordValidation,
  );
  const [name, onChangeName, nameError] = useInput(
    userInfo ? userInfo.name : '',
    notEmptyValidation,
  );
  const [email, onChangeEmail, emailError] = useInput(
    userInfo ? userInfo.email : '',
    emailValidation,
  );
  const [phoneNumber, onChangePhoneNumber, phoneNumberError] = useInput(
    userInfo ? userInfo.phoneNumber : '',
    phoneNumberValidation,
  );
  const [department, onChangeDepartment, departmentError] = useInput(
    userInfo ? userInfo.department : '',
    notEmptyValidation,
  );
  const [studentId, onChangeStudentId, studentIdError] = useInput(
    userInfo ? userInfo.studentID : '',
    notEmptyValidation,
  );
  const [introduction, onChangeIntroduction, introductionError] = useInput(
    userInfo ? userInfo.introduction : '',
    notEmptyValidation,
  );

  const [profileImageURL, setProfileImageURL] = useState(
    userInfo
      ? userInfo.profileImageURL
        ? userInfo.profileImageURL
        : profileImagePlaceholders[0]
      : profileImagePlaceholders[0],
  );

  const [role, onChangeRole] = useInput(
    userInfo ? userInfo.role : 'MEMBER',
    notEmptyValidation,
  );

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordError] = useState(false);

  const [withdrawCheck, onChangeWithdrawCheck, withdrawCheckError] = useInput(
    '',
    withdrawCheckValidation,
  );

  const handlePasswordCheckError = (input) => {
    if (password !== input) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    handlePasswordCheckError(e.target.value);
  };

  const registerValidation = () => {
    return !(
      idError ||
      !id ||
      passwordError ||
      !password ||
      passwordCheckError ||
      !passwordCheck ||
      nameError ||
      !name ||
      emailError ||
      !email ||
      phoneNumberError ||
      !phoneNumber ||
      departmentError ||
      !department ||
      studentIdError ||
      !studentId ||
      introductionError ||
      !introduction
    );
  };

  const updateValidation = () => {
    return !(
      passwordError ||
      !password ||
      passwordCheckError ||
      !passwordCheck ||
      emailError ||
      !email ||
      phoneNumberError ||
      !phoneNumber ||
      introductionError ||
      !introduction
    );
  };

  const loginValidation = () => {
    return !(idError || !id || passwordError || !password);
  };

  const setInputErrorMessage = () => {
    onChangeMessage('모든 값을 올바르게 입력해주세요.');
  };

  const handleLogin = throttle(() => {
    if (!loginValidation()) {
      setInputErrorMessage();
      handleModalOpen();
      return;
    }
    onSubmit({
      id,
      password,
    });
  }, 1000);

  const handleRegister = throttle(() => {
    if (!registerValidation()) {
      setInputErrorMessage();
      handleModalOpen();
      return;
    }
    onSubmit({
      id,
      password,
      passwordCheck,
      name,
      email,
      department,
      studentId,
      phoneNumber,
      introduction,
      profileImageURL,
    });
  }, 1000);

  const handleUpdate = throttle(() => {
    if (!updateValidation()) {
      setInputErrorMessage();
      handleModalOpen();
      return;
    }
    onSubmit({
      name,
      password,
      passwordCheck,
      email,
      phoneNumber,
      introduction,
      profileImageURL,
    });
  }, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      handleLogin();
    }
    if (type === 'register') {
      handleRegister();
    }
    if (type === 'update') {
      handleUpdate();
    }
  };

  const onChangeProfileImageURL = (e) => {
    setProfileImageURL(profileImagePlaceholders[e.target.value]);
  };

  const handleUpdateMemberRoleBySelf = (e) => {
    e.preventDefault();
    onUpdateMemberRoleBySelf({ role });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    onWithdraw({ role });
  };

  return (
    <>
      <RegisterModalContainer
        visible={modalVisible}
        onConfirm={handleModalClose}
        onCancel={handleModalClose}
        message={message}
      />
      <Block>
        <WhiteBlock>
          <FormListHeader>
            <h2 className="form_list_title">{headerText}</h2>
          </FormListHeader>
          <FormList>
            <Input
              valueText={id}
              labelText="아이디"
              typeText="text"
              nameText="id"
              error={idError}
              disabledCondition={type === 'update'}
              onChangeFunc={onChangeId}
              placeholderText="영/숫자 4~12자리"
            />
            <Input
              valueText={password}
              labelText="비밀번호"
              typeText="password"
              nameText="password"
              error={passwordError}
              onChangeFunc={onChangePassword}
              placeholderText="8자리 이상"
            />
            {type !== 'login' && (
              <Input
                valueText={passwordCheck}
                labelText="비밀번호 확인"
                typeText="password"
                nameText="password_check"
                error={passwordCheckError}
                onChangeFunc={onChangePasswordCheck}
                placeholderText="8자리 이상"
              />
            )}
            {type !== 'login' && (
              <>
                <Input
                  valueText={name}
                  labelText="이름"
                  typeText="text"
                  nameText="name"
                  error={nameError}
                  disabledCondition={type === 'update'}
                  onChangeFunc={onChangeName}
                  placeholderText="ex) 김풀씨"
                />
                <Input
                  valueText={email}
                  labelText="이메일"
                  typeText="email"
                  nameText="email"
                  error={emailError}
                  onChangeFunc={onChangeEmail}
                  placeholderText="ex) email@example.com"
                />
                <Input
                  valueText={phoneNumber}
                  labelText="전화번호"
                  typeText="text"
                  nameText="phoneNumber"
                  error={phoneNumberError}
                  onChangeFunc={onChangePhoneNumber}
                  placeholderText="ex) 010-0000-0000"
                />
                <Input
                  valueText={department}
                  labelText="소속 학과"
                  typeText="text"
                  nameText="department"
                  error={departmentError}
                  onChangeFunc={onChangeDepartment}
                  disabledCondition={type === 'update'}
                  placeholderText="ex) 컴퓨터과학과"
                />
                <Input
                  valueText={studentId}
                  labelText="학번"
                  typeText="text"
                  nameText="studentId"
                  error={studentIdError}
                  onChangeFunc={onChangeStudentId}
                  disabledCondition={type === 'update'}
                  placeholderText="ex) 2021000000"
                />
                <label>프로필 이미지</label>
                <ProfileImageSelectContainer>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <ProfileImageSelect key={num}>
                      <input
                        type="radio"
                        value={num}
                        onChange={onChangeProfileImageURL}
                        checked={
                          profileImageURL === profileImagePlaceholders[num]
                            ? true
                            : false
                        }
                      />
                      <ProfileImage
                        src={getFileUrl(profileImagePlaceholders[num])}
                      />
                    </ProfileImageSelect>
                  ))}
                </ProfileImageSelectContainer>
                <label htmlFor="introduction">자기소개</label>
                <StyledTextarea
                  value={introduction}
                  name="introduction"
                  id="introduction"
                  cols="30"
                  rows="5"
                  onChange={onChangeIntroduction}
                  placeholder="자기 소개를 적어주세요"
                >
                  {introduction}
                </StyledTextarea>
              </>
            )}
            <SubmitButton onClick={handleSubmit}>{headerText}</SubmitButton>
          </FormList>
          {type === 'login' && (
            <StyledLink to={`/${MENU.PASSWORD}`}>
              비밀번호를 잊어버리셨나요?
            </StyledLink>
          )}
          {type === 'update' && (
            <>
              <FormListHeader>
                <h2 className="form_list_title">회원 상태 변경</h2>
              </FormListHeader>
              <FormList>
                <>
                  <StyledSelect value={role} onChange={onChangeRole}>
                    {roles?.map((r) => (
                      <option key={r.name} value={r.name}>
                        {r.description}
                      </option>
                    ))}
                  </StyledSelect>
                  <SubmitButton
                    onClick={(e) => {
                      handleUpdateMemberRoleBySelf(e);
                    }}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    회원 상태 수정
                  </SubmitButton>
                </>
              </FormList>
              <FormListHeader>
                <h2 className="form_list_title">회원 탈퇴</h2>
              </FormListHeader>
              <FormList>
                <Input
                  valueText={withdrawCheck}
                  labelText="탈퇴 확인 문구 입력"
                  typeText="text"
                  nameText="confirmWithdrawal"
                  error={withdrawCheckError}
                  onChangeFunc={onChangeWithdrawCheck}
                  placeholderText="탈퇴를 확인합니다"
                />
                <WithdrawalButton
                  onClick={(e) => handleWithdraw(e)}
                  style={{ marginLeft: '0.5rem' }}
                  disabled={withdrawCheckError || !withdrawCheck}
                >
                  탈퇴
                </WithdrawalButton>
              </FormList>
            </>
          )}
        </WhiteBlock>
      </Block>
    </>
  );
};

export default AuthForm;
