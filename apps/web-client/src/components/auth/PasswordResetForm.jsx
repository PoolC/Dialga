import { useState } from 'react';
import styled from '@emotion/styled';
import useInput from '../../hooks/useInput';
import {
  emailValidation,
  passwordValidation,
} from '../../lib/utils/validation';
import { Block, WhiteBlock } from '../../styles/common/Block.styles';
import { FormList, FormListHeader, SubmitButton } from './AuthForm.styles';
import { Input } from './AuthForm';
import colors from '../../lib/styles/colors';
import RegisterModalContainer from '../../containers/auth/RegisterModalContainer/RegisterModalContainer';
import Spinner from '../common/Spinner/Spinner';
import throttle from '../../lib/utils/throttle';

const Description = styled.p`
  max-width: 320px;
  font-size: 0.8rem;
  font-weight: 300;
  margin: 0 1rem 2rem 1rem;
  color: ${colors.brown[0]};
  line-height: 1.2rem;
  text-align: center;
  word-break: keep-all;
`;

const PasswordResetForm = ({
  type,
  message,
  onChangeMessage,
  modalVisible,
  handleModalOpen,
  handleModalClose,
  onSubmit,
  loading = false,
}) => {
  const [email, onChangeEmail, emailError] = useInput('', emailValidation);
  const [password, onChangePassword, passwordError] = useInput(
    '',
    passwordValidation,
  );
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordError] = useState(false);

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

  const resetPasswordValidation = () => {
    return !(
      passwordError ||
      !password ||
      passwordCheckError ||
      !passwordCheck
    );
  };

  const sendEmailValidation = () => {
    return !(emailError || !email);
  };

  const setInputErrorMessage = () => {
    onChangeMessage('모든 값을 올바르게 입력해주세요.');
  };

  const handleSendEmail = throttle((e) => {
    if (!sendEmailValidation()) {
      setInputErrorMessage();
      handleModalOpen();
      return;
    }
    onSubmit({
      email,
    });
  }, 1000);

  const handleResetPassword = throttle((e) => {
    if (!resetPasswordValidation()) {
      setInputErrorMessage();
      handleModalOpen();
      return;
    }
    onSubmit({
      password,
      passwordCheck,
    });
  }, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'email') {
      handleSendEmail();
    }
    if (type === 'reset') {
      handleResetPassword();
    }
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
          {loading && <Spinner />}
          <FormListHeader>
            <h2 className="form_list_title">
              {type === 'email' ? '비밀번호 찾기' : '비밀번호 재설정'}
            </h2>
          </FormListHeader>
          {type === 'email' && (
            <Description>
              가입 시 입력하신 이메일 주소를 입력하세요.
              <br />
              입력하신 이메일 주소로 비밀번호 재설정 링크가 전송됩니다.
            </Description>
          )}
          <FormList>
            {type === 'reset' && (
              <>
                <Input
                  valueText={password}
                  labelText="새로운 비밀번호"
                  typeText="password"
                  nameText="password"
                  error={passwordError}
                  onChangeFunc={onChangePassword}
                  placeholderText="8자리 이상"
                />
                <Input
                  valueText={passwordCheck}
                  labelText="새로운 비밀번호 확인"
                  typeText="password"
                  nameText="password_check"
                  error={passwordCheckError}
                  onChangeFunc={onChangePasswordCheck}
                  placeholderText="8자리 이상"
                />
                <SubmitButton onClick={handleSubmit}>
                  비밀번호 재설정
                </SubmitButton>
              </>
            )}
            {type === 'email' && (
              <>
                <Input
                  valueText={email}
                  labelText="이메일"
                  typeText="email"
                  nameText="email"
                  error={emailError}
                  onChangeFunc={onChangeEmail}
                  placeholderText="ex) email@example.com"
                />
                <SubmitButton onClick={handleSubmit}>이메일 전송</SubmitButton>
              </>
            )}
          </FormList>
        </WhiteBlock>
      </Block>
    </>
  );
};

export default PasswordResetForm;
