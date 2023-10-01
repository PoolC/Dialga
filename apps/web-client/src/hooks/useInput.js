import { useCallback, useState } from 'react';

export default (initialValue = null, condition) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const handler = useCallback(
    (e) => {
      setValue(e.target.value);
      if (!condition(e.target.value)) {
        setError(true);
      }
      if (condition(e.target.value)) {
        setError(false);
      }
    },
    [condition],
  );
  return [value, handler, error];
};
