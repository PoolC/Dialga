import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function BusinessScrollTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.key]);

  return null;
}
