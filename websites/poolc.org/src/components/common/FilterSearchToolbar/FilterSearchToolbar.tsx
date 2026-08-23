import { FormEvent, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { createStyles } from 'antd-style';
import colors from '~/lib/styles/colors';

export type FilterSearchToolbarOption<T extends string> = {
  label: string;
  value: T;
};

type FilterSearchToolbarProps<TFilter extends string, TSearchType extends string> = {
  filter: {
    value: TFilter;
    options: FilterSearchToolbarOption<TFilter>[];
    onChange: (value: TFilter) => void;
  };
  search: {
    type: TSearchType;
    keyword: string;
    options: FilterSearchToolbarOption<TSearchType>[];
    onSubmit: (value: { type: TSearchType; keyword: string }) => void;
    placeholder?: string;
  };
  className?: string;
  layout?: 'spread' | 'cluster';
  filterPlacement?: 'start' | 'search';
  showSearchType?: boolean;
};

const useFilterSelectStyles = createStyles(({ css }) => ({
  filterSelect: css`
    width: 128px;

    .ant-select-selector {
      height: 36px !important;
      border: none !important;
      box-shadow: none !important;
      align-items: center;
    }

    .ant-select-selection-item {
      color: rgba(76, 55, 34, 1);
      font-weight: 500;
      font-size: 15px;
      line-height: 36px !important;
    }
  `,
}));

const useStyles = createStyles(({ css }) => ({
  toolbar: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
  cluster: css`
    justify-content: center;
    gap: 12px;
  `,
  searchForm: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 330px;
    gap: 8px;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  compactSearchForm: css`
    width: 430px;

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
  searchFilterSelect: css`
    width: 110px;

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
    max-width: 197px;

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

    @media (max-width: 768px) {
      max-width: none;
    }
  `,
  wideSearchInput: css`
    max-width: none;
  `,
  searchButton: css`
    width: 55px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: ${colors.mint[3]};
    font-weight: 700;
    box-shadow: none;

    &:hover,
    &:focus {
      background: ${colors.mint[3]} !important;
      opacity: 0.88;
    }
  `,
}));

type FilterSelectProps<TFilter extends string> = {
  value: TFilter;
  options: FilterSearchToolbarOption<TFilter>[];
  onChange: (value: TFilter) => void;
  className?: string;
};

export function FilterSelect<TFilter extends string>({ value, options, onChange, className }: FilterSelectProps<TFilter>) {
  const { styles, cx } = useFilterSelectStyles();

  return (
    <Select
      getPopupContainer={(trigger) => trigger.parentNode}
      className={cx(styles.filterSelect, className)}
      value={value}
      onChange={(nextValue) => onChange(nextValue)}
      options={options}
    />
  );
}

export function FilterSearchToolbar<TFilter extends string, TSearchType extends string>({
  filter,
  search,
  className,
  layout = 'spread',
  filterPlacement = 'start',
  showSearchType = true,
}: FilterSearchToolbarProps<TFilter, TSearchType>) {
  const { styles, cx } = useStyles();
  const [searchType, setSearchType] = useState(search.type);
  const [keyword, setKeyword] = useState(search.keyword);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search.onSubmit({ type: searchType, keyword });
  };

  return (
    <div className={cx(styles.toolbar, layout === 'cluster' && styles.cluster, className)}>
      {filterPlacement === 'start' && (
        <FilterSelect value={filter.value} onChange={filter.onChange} options={filter.options} />
      )}
      <form className={cx(styles.searchForm, !showSearchType && styles.compactSearchForm)} onSubmit={onSubmit}>
        {filterPlacement === 'search' && (
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            className={styles.searchFilterSelect}
            value={filter.value}
            onChange={(value) => filter.onChange(value)}
            options={filter.options}
          />
        )}
        {showSearchType && (
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            className={styles.searchSelect}
            value={searchType}
            onChange={(value) => setSearchType(value)}
            options={search.options}
          />
        )}
        <Input className={cx(styles.searchInput, !showSearchType && styles.wideSearchInput)} placeholder={search.placeholder} value={keyword} onChange={(event) => setKeyword(event.target.value)} />
        <Button className={styles.searchButton} type="primary" htmlType="submit">
          검색
        </Button>
      </form>
    </div>
  );
}
