import { ReactNode, useState } from 'react';
import { CheckOutlined, FilterOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';
import { media } from '~/styles/responsive';

type MobileSectionFilterItem = {
  key: string;
  label: string;
};

type MobileSectionFilterProps = {
  items: MobileSectionFilterItem[];
  activeKey: string;
  onChange: (key: string) => void;
  title: string;
  allLabel?: string;
  triggerIcon?: ReactNode;
  fullWidth?: boolean;
  visibleBelowWide?: boolean;
  showDrawerHeader?: boolean;
  className?: string;
};

export const MobileSectionFilter = ({
  items,
  activeKey,
  onChange,
  title,
  allLabel,
  triggerIcon = <FilterOutlined />,
  fullWidth = false,
  visibleBelowWide = false,
  showDrawerHeader = true,
  className,
}: MobileSectionFilterProps) => {
  const [isOpen, setOpen] = useState(false);
  const selectedItem = items.find((item) => item.key === activeKey);

  return (
    <FilterContainer className={className} data-visible-below-wide={visibleBelowWide}>
      <FilterTrigger type="button" data-full-width={fullWidth} onClick={() => setOpen(true)} aria-label={title}>
        {triggerIcon}
        <span>{activeKey === 'ALL' ? '필터' : selectedItem?.label}</span>
      </FilterTrigger>
      <Drawer
        title={showDrawerHeader ? title : undefined}
        closable={showDrawerHeader}
        placement="bottom"
        open={isOpen}
        onClose={() => setOpen(false)}
        height="auto"
        styles={showDrawerHeader ? undefined : { header: { display: 'none' } }}
      >
        <FilterOptions>
          {items.map((item) => {
            const isSelected = item.key === activeKey;

            return (
              <FilterOption
                key={item.key}
                type="button"
                data-selected={isSelected}
                onClick={() => {
                  onChange(item.key);
                  setOpen(false);
                }}
              >
                <span>{item.key === 'ALL' ? (allLabel ?? item.label) : item.label}</span>
                {isSelected && <CheckOutlined />}
              </FilterOption>
            );
          })}
        </FilterOptions>
      </Drawer>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: none;

  ${media.mobile} {
    display: block;
  }

  &[data-visible-below-wide='true'] {
    ${media.belowWide} {
      display: block;
    }
  }
`;

const FilterTrigger = styled.button`
  display: inline-flex;
  height: 36px;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border: 1px solid #d8d0c3;
  border-radius: 6px;
  background: #ffffff;
  color: ${colors.brown[1]};
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  box-sizing: border-box;

  ${media.mobile} {
    height: 44px;
  }

  &[data-full-width='true'] {
    width: 100%;
    justify-content: space-between;
  }
`;

const FilterOptions = styled.div`
  display: grid;
  gap: 8px;
`;

const FilterOption = styled.button`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border: 1px solid #e7e0d7;
  border-radius: 6px;
  background: #ffffff;
  color: ${colors.brown[1]};
  font-size: 15px;
  font-weight: 700;
  text-align: left;

  &[data-selected='true'] {
    border-color: ${colors.mint[3]};
    background: #f1fbf8;
    color: #16896d;
  }
`;
