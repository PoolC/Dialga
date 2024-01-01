import { Suspense } from 'react';
import Skeleton from '~/components/common/Skeleton';
import HomeEntry from '~/components/home/HomeEntry';

export default function HomePage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HomeEntry />
    </Suspense>
  );
}
