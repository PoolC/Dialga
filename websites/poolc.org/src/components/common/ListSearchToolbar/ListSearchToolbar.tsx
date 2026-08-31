import { FormEvent, ReactNode } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';
import { media } from '~/styles/responsive';

type ListSearchToolbarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  children?: ReactNode;
  className?: string;
};

export const ListSearchToolbar = ({ value, placeholder, onChange, onSubmit, children, className }: ListSearchToolbarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <Toolbar className={className}>
      <SearchForm onSubmit={handleSubmit}>
        <Input placeholder={placeholder} prefix={<SearchOutlined />} value={value} onChange={(event) => onChange(event.target.value)} />
      </SearchForm>
      {children}
    </Toolbar>
  );
};

const Toolbar = styled.div`
  display: flex;
  width: 306px;
  gap: 8px;

  ${media.mobile} {
    width: 100%;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  width: 100%;

  .ant-input-affix-wrapper {
    height: 36px;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    box-shadow: none;
  }

  .ant-input {
    color: ${colors.brown[1]};
    font-size: 14px;
  }

  .ant-input::placeholder {
    color: #9b8d7b;
  }

  .ant-input-affix-wrapper-focused {
    border-color: ${colors.mint[3]};
    box-shadow: 0 0 0 3px rgb(0 168 137 / 16%);
  }

  .ant-input-prefix {
    margin-right: 8px;
    color: #9b8d7b;
    font-size: 15px;
  }

  ${media.compact} {
    .ant-input-affix-wrapper {
      height: 40px;
    }
  }

  ${media.phone} {
    .ant-input-affix-wrapper {
      height: 44px;
    }

    .ant-input {
      font-size: 15px;
    }
  }
`;
