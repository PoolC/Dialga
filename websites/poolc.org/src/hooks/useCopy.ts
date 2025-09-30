import { useState, useCallback } from 'react';

export default function useCopy() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      legacyCopy(text);
    }

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, []);

  return {
    isCopied,
    copy,
  };
}

function legacyCopy(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
