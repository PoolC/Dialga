import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import colors from '~/lib/styles/colors';
import { media, pageGutter } from '~/styles/responsive';

type PageShellProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

type PagePanelProps = PageShellProps & {
  narrow?: boolean;
};

type ResponsiveGridProps = PageShellProps & {
  minColumnWidth?: number;
  gap?: number;
};

export const PageShell = ({ children, className, ...rest }: PageShellProps) => <Shell className={className} {...rest}>{children}</Shell>;
export const PageContent = ({ children, className, ...rest }: PageShellProps) => <Content className={className} {...rest}>{children}</Content>;
export const Block = ({ children, className, ...rest }: PageShellProps) => <Shell className={className} {...rest}>{children}</Shell>;

export const TwoColumnPageShell = ({ children, className, ...rest }: PageShellProps) => <TwoColumnShell className={className} {...rest}>{children}</TwoColumnShell>;

export const PagePanel = ({ children, className, narrow = false, ...rest }: PagePanelProps) => (
  <Panel className={className} data-narrow={narrow} {...rest}>
    {children}
  </Panel>
);

export const ResponsiveGrid = ({ children, className, minColumnWidth = 240, gap = 16, ...rest }: ResponsiveGridProps) => (
  <Grid className={className} style={{ '--grid-min-column-width': `${minColumnWidth}px`, '--grid-gap': `${gap}px` } as CSSProperties} {...rest}>
    {children}
  </Grid>
);

const Shell = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 ${pageGutter.wide};

  ${media.standard} {
    padding: 0 ${pageGutter.standard};
  }

  ${media.compact} {
    min-height: 100%;
    padding: 0;
    background: #ffffff;
  }
`;

const TwoColumnShell = styled.div`
  position: relative;
  top: 0;
  display: flex;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  gap: 24px;
  box-sizing: border-box;
  padding: 0 ${pageGutter.wide};

  ${media.belowWide} {
    flex-direction: column;
    gap: 16px;
    padding: 0 ${pageGutter.standard};
  }

  ${media.compact} {
    padding: 0;
    background: #ffffff;

    &[data-admin-layout='true'] {
      padding: 0 ${pageGutter.compact};
      background: transparent;
    }
  }

  > * {
    min-width: 0;
  }

  > [data-narrow] {
    width: auto;
  }

  ${media.belowWide} {
    > [data-narrow] {
      width: 100%;
    }
  }
`;

const Panel = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  max-width: 1366px;
  min-height: 50vh;
  margin: 0;
  padding: 60px 48px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 0 20px ${colors.gray[1]};
  box-sizing: border-box;

  &[data-narrow='true'] {
    width: auto;
    margin: 0;
    padding: 40px 20px;
  }

  ${media.standard} {
    padding: 48px 32px;
  }

  ${media.compact} {
    min-height: 100%;
    padding: 32px 20px;
    border-radius: 0;
    box-shadow: none;

    [data-admin-layout='true'] & {
      min-height: auto;
      border-radius: 10px;
      box-shadow: 0 0 20px ${colors.gray[1]};
    }
  }

  ${media.compact} {
    && {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1210px;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min-column-width), 100%), 1fr));
  gap: var(--grid-gap);
`;
