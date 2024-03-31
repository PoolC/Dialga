import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import BusinessScrollTopOnRouteChange from '~/components/@business/BusinessScrollTopOnRouteChange';
import BusinessShowProgressOnRouteChange from '~/components/@business/BusinessShowProgressOnRouteChange';
import DefaultLayout from '~/components/layouts/DefaultLayout';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <BusinessScrollTopOnRouteChange />
      <BusinessShowProgressOnRouteChange />
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  );
}
