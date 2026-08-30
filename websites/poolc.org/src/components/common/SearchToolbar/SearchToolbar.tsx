import { Button, Input, Select } from 'antd';
import { createStyles } from 'antd-style';
import type { FormEvent } from 'react';
import colors from '~/lib/styles/colors';

type SearchOption = {
  label: string;
  value: string;
};

type SearchToolbarProps = {
  options?: SearchOption[];
  searchType?: string;
  keyword: string;
  placeholder: string;
  onSearchTypeChange?: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  showSearchType?: boolean;
  searchTypeWidth?: number;
};

const useStyles = createStyles(({ css }) => ({
  toolbar: css`
    display: flex;
    width: 300px;
    gap: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  searchSelect: css`
    width: 72px;

    .ant-select-selector {
      height: 36px !important;
      border: none !important;
      border-radius: 6px !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
      align-items: center;
    }

    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
      line-height: 36px !important;
    }
  `,
  searchInput: css`
    flex: 1;
    min-width: 0;

    &.ant-input {
      height: 36px;
      border: 1px solid #d8d0c3;
      border-radius: 6px;
      color: ${colors.brown[1]};
      font-size: 14px;
      box-shadow: none;
    }

    &.ant-input::placeholder {
      color: #9b8d7b;
    }

    &.ant-input:focus {
      border-color: ${colors.mint[3]};
      box-shadow: 0 0 0 3px rgb(0 168 137 / 16%);
    }
  `,
  searchButton: css`
    width: 52px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: ${colors.mint[3]};
    font-weight: 600;
    font-size: 13px;
    box-shadow: none;

    &:hover,
    &:focus {
      background: ${colors.mint[3]} !important;
      opacity: 0.88;
    }
  `,
}));

export const SearchToolbar = ({
  options,
  searchType,
  keyword,
  placeholder,
  onSearchTypeChange,
  onKeywordChange,
  onSearch,
  showSearchType = true,
  searchTypeWidth,
}: SearchToolbarProps) => {
  const { styles } = useStyles();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className={styles.toolbar} onSubmit={handleSubmit}>
      {showSearchType && options && searchType !== undefined && onSearchTypeChange && (
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.searchSelect}
          style={searchTypeWidth ? { width: searchTypeWidth } : undefined}
          value={searchType}
          onChange={onSearchTypeChange}
          options={options}
        />
      )}
      <Input className={styles.searchInput} placeholder={placeholder} value={keyword} onChange={(event) => onKeywordChange(event.target.value)} />
      <Button className={styles.searchButton} type="primary" htmlType="submit">
        검색
      </Button>
    </form>
  );
};
