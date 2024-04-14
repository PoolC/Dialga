import { Suspense } from 'react';
import Skeleton from '../common/Skeleton';
import IntroPoolc from './IntroPoolc';

const IntroContainer = () => (
  <Suspense fallback={<Skeleton />}>
    <IntroPoolc />
  </Suspense>
);

export default IntroContainer;
