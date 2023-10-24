import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
  ignoredRefs: React.RefObject<HTMLElement>[] = [],
) => {
  const handleClickOutside = (event: MouseEvent) => {
    console.log(ref, ignoredRefs);
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !ignoredRefs.some((ignoredRef) => ignoredRef.current?.contains(event.target as Node))
    ) {
      callback(event);
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
