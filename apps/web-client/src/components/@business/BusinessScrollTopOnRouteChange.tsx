import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export default function BusinessScrollTopOnRouteChange() {
  const router = useRouter();
  const location = router.history.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
