import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import styled from '@emotion/styled';

type HorizontalScrollAreaProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export const HorizontalScrollArea = ({ children, className, ariaLabel = '표를 좌우로 스크롤할 수 있습니다' }: HorizontalScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const updateScrollableState = () => {
      const scrollable = viewport.scrollWidth > viewport.clientWidth + 1;
      setIsScrollable(scrollable);
      setShowScrollCue(scrollable && viewport.scrollLeft <= 8);
    };

    const handleScroll = () => setShowScrollCue(viewport.scrollLeft <= 8);
    const resizeObserver = new ResizeObserver(updateScrollableState);

    updateScrollableState();
    resizeObserver.observe(viewport);
    viewport.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [children]);

  return (
    <Container className={className} data-scrollable={isScrollable}>
      <Viewport ref={viewportRef} aria-label={ariaLabel} tabIndex={0}>
        {children}
      </Viewport>
      {showScrollCue && <ScrollCue aria-hidden="true"><ArrowLeftRight size={16} strokeWidth={2} /></ScrollCue>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Viewport = styled.div`
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #b5c9c2 transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    border-radius: 999px;
    background: #b5c9c2;
    background-clip: content-box;
  }
`;

const ScrollCue = styled.span`
  position: absolute;
  top: 9px;
  right: 9px;
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid #cbded7;
  border-radius: 6px;
  background: rgb(255 255 255 / 92%);
  color: #318b72;
  pointer-events: none;
`;
