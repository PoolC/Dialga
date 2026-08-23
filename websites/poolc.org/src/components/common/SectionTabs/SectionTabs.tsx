import { Tabs } from 'antd';
import styled from '@emotion/styled';

type SectionTabItem = {
  key: string;
  label: string;
};

type SectionTabsProps = {
  items: SectionTabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
};

export const SectionTabs = ({ items, activeKey, onChange, className }: SectionTabsProps) => (
  <StyledTabs className={className} items={items} activeKey={activeKey} onChange={onChange} />
);

const StyledTabs = styled(Tabs)`
  width: 100%;
  margin-top: 0;

  .ant-tabs-nav {
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  }

  .ant-tabs-nav::before {
    border-bottom: 0;
  }

  .ant-tabs-tab {
    padding: 12px 0 14px;
    color: rgba(76, 55, 34, 0.76);
    font-weight: 600;
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 28px;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #47be9b;
    font-weight: 800;
  }

  .ant-tabs-ink-bar {
    height: 2px;
    border-radius: 999px;
    background: #47be9b;
  }

  .ant-tabs-content-holder {
    display: none;
  }
`;
