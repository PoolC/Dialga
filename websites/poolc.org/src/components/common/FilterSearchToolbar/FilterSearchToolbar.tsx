import { FormEvent, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { createStyles } from 'antd-style';

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
  filterSelect: css`
    width: 110px;

    .ant-select-selector {
      border: none !important;
      box-shadow: none !important;
    }

    .ant-select-selection-item {
      color: rgba(76, 55, 34, 1);
      font-weight: 500;
      font-size: 14px;
    }
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
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }

    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
    }
  `,
  searchFilterSelect: css`
    width: 110px;

    .ant-select-selector {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(245, 245, 245, 1) !important;
    }

    .ant-select-selection-item {
      color: rgba(130, 121, 113, 1);
      font-weight: 700;
      font-size: 14px;
    }
  `,
  searchInput: css`
    flex: 1;
    min-width: 0;
    max-width: 197px;

    @media (max-width: 768px) {
      max-width: none;
    }
  `,
  wideSearchInput: css`
    max-width: none;
  `,
  searchButton: css`
    width: 55px;
  `,
}));

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
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          className={styles.filterSelect}
          value={filter.value}
          onChange={(value) => filter.onChange(value)}
          options={filter.options}
        />
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
