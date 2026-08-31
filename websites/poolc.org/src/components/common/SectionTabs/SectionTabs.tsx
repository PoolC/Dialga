import { Tabs } from 'antd';
import styled from '@emotion/styled';
import { media } from '~/styles/responsive';

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

  ${media.mobile} {
    .ant-tabs-nav {
      overflow: visible;
    }

    .ant-tabs-nav-wrap {
      overflow-x: auto;
      scrollbar-width: none;
    }

    .ant-tabs-nav-wrap::-webkit-scrollbar {
      display: none;
    }

    .ant-tabs-nav-list {
      min-width: max-content;
      padding-right: 12px;
    }

    .ant-tabs-tab {
      padding: 10px 0 12px;
    }

    .ant-tabs-tab + .ant-tabs-tab {
      margin-left: 22px;
    }
  }

  ${media.phone} {
    .ant-tabs-nav-list {
      padding-right: 20px;
    }
  }
`;
