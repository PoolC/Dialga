import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import colors from '~/lib/styles/colors';

TopBarProgress.config({
  barColors: {
    '0': colors.mint[1],
    '1.0': colors.mint[6],
  },
  shadowBlur: 5,
});

export default function BusinessShowProgressOnRouteChange() {
  const location = useLocation();
  const [progressVisible, setProgressVisible] = useState(false);
  const timeoutRef = useRef(0);

  useEffect(() => {
    setProgressVisible(true);
    timeoutRef.current = window.setTimeout(() => {
      setProgressVisible(false);
    }, 300);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [location.key]);

  return progressVisible ? <TopBarProgress /> : null;
}
