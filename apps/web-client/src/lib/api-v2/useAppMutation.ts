import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMessage } from '~/hooks/useMessage';

/**
 *  @description
 *  - mutatin Func
 *  - avoid duplicate request
 *  @see https://medium.com/@jdimitrop/react-query-avoiding-duplicate-mutation-requests-38c722e7a2e9
 * */
export const useAppMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  mutationFn,
  ...rest
}: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationResult<
  TData,
  TError,
  TVariables,
  TContext
> => {
  const message = useMessage();
  const mutationResults = useMutation(mutationFn!, {
    onError() {
      message.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
    ...rest,
  });

  return {
    ...mutationResults,
    mutate: (...params: [TVariables]) => {
      if (!mutationResults.isLoading) {
        mutationResults.mutate(...params);
      }
    },
  };
};
