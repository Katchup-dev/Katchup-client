import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  ignoredRefs: React.RefObject<HTMLElement>[] = [],
) => {
  const handleClickOutside = (event: Event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !ignoredRefs.some((ignoredRef) => ignoredRef.current?.contains(event.target as Node))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, ignoredRefs]);
};

export default useClickOutside;
