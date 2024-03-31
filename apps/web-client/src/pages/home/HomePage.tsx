import { Suspense } from 'react';
import { json } from 'react-router-dom';
import Skeleton from '~/components/common/Skeleton';
import HomeEntry from '~/components/home/HomeEntry';

export function loader() {
  return json({
    message: 'hello',
  });
}

export function HomePage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HomeEntry />
    </Suspense>
  );
}
