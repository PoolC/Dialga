declare module 'react-reveal' {
  import { PropsWithChildren } from 'react';

  export const Zoom: React.FC<PropsWithChildren<Record<string, any>>>;
  export const Fade: React.FC<PropsWithChildren<Record<string, any>>>;
}
