import { useRouter } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
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
  const router = useRouter();
  const location = router.history.location;
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
  }, [location]);

  return progressVisible ? <TopBarProgress /> : null;
}
