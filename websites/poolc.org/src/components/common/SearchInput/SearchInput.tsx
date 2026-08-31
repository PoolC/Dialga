import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { Input } from '~/components/ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
};

export const SearchInput = ({ value, onChange, placeholder, ariaLabel, className }: SearchInputProps) => (
  <SearchField className={className}>
    <SearchIcon>
      <Search size={16} strokeWidth={2} aria-hidden="true" />
    </SearchIcon>
    <Input aria-label={ariaLabel} placeholder={placeholder} value={value} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} />
  </SearchField>
);

const SearchField = styled.div`
  position: relative;
  width: 260px;

  input[data-slot='input'] {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 0 12px 0 36px;
    border: 1px solid #d8d0c3;
    border-radius: 6px;
    background: #ffffff;
    color: #3d3328;
    font-size: 14px;
    line-height: 40px;
    outline: none;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  input[data-slot='input']::placeholder {
    color: #9b8d7b;
  }

  input[data-slot='input']:focus-visible {
    border-color: #00a889;
    box-shadow: 0 0 0 3px rgb(0 168 137 / 16%);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  z-index: 1;
  display: flex;
  color: #8a7d6a;
  transform: translateY(-50%);
  pointer-events: none;
`;
