import React, { PropsWithChildren } from 'react';

export default class BusinessErrorBoundary extends React.Component<PropsWithChildren> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</h1>;
    }

    return this.props.children;
  }
}
