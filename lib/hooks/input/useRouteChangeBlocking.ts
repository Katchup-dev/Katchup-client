import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const useRouteChangeBlocking = (blockingCallback: () => void, input: string) => {
  const router = useRouter();
  const [requestedUrl, setRequestedUrl] = useState<string>('');

  const isSamePath = useCallback(
    (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
    [router.asPath],
  );

  const syncUrlWithRouter = useCallback(() => {
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath);
    }
  }, [router.asPath]);

  const handleRouterChangeStart = useCallback(
    (url: string) => {
      if (isSamePath(url) || input.length === 0) {
        return;
      }
      syncUrlWithRouter();
      setRequestedUrl(url);
      blockingCallback();
      router.events.emit('routeChangeError');
      throw 'OK, This is Not Error';
    },
    [router.events, syncUrlWithRouter, isSamePath, blockingCallback],
  );

  const offRouteChangeBlocking = useCallback(
    (offBlockingCallback?: () => void) => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
      router.replace(requestedUrl);
      offBlockingCallback?.();
    },
    [handleRouterChangeStart, requestedUrl, router],
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouterChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
    };
  }, [router.events, handleRouterChangeStart]);

  return { offRouteChangeBlocking };
};

export default useRouteChangeBlocking;
