import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { message } from 'antd';
import { noop } from '~/lib/utils/noop';

const MessageContext = createContext<{
  success: (text: string) => void;
  error: (text: string) => void;
  warn: (text: string) => void;
}>({
  success: (text: string) => {
    throw new Error('not override yet. message context - success method');
  },
  error: (text: string) => {
    throw new Error('not override yet. message context - error method');
  },
  warn: (text: string) => {
    throw new Error('not override yet. message context - warn method');
  },
});

export function useMessage() {
  return useContext(MessageContext);
}

export function MessageProvider({ children }: PropsWithChildren<object>) {
  const [messageApi, contextHolder] = message.useMessage();

  const value = useMemo(
    () => ({
      success: (text: string) => {
        messageApi.success(text).then(noop);
      },
      error: (text: string) => {
        messageApi.error(text).then(noop);
      },
      warn: (text: string) => {
        messageApi.warning(text).then(noop);
      },
    }),
    [messageApi],
  );

  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}
