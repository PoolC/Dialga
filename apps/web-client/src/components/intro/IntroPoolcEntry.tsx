import { Suspense, useEffect, useState } from 'react';
import Skeleton from '../common/Skeleton';
import IntroPoolc from './IntroPoolc';

const IntroContainer = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <IntroPoolc />
    </Suspense>
  );
};

export default IntroContainer;
