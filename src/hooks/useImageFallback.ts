import { useEffect, useState } from "react";

/**
 * Renders `primary` first (meant to be a local, permanent asset). If it
 * 404s or otherwise fails to load, falls back to `fallback` exactly once
 * (meant to be a remote URL) — so the image never just disappears.
 *
 * Usage:
 *   const { src, onError } = useImageFallback(local, remote);
 *   <img src={src} onError={onError} />
 */
export function useImageFallback(primary: string, fallback: string) {
  const [src, setSrc] = useState(primary);
  const [failedOnce, setFailedOnce] = useState(false);

  useEffect(() => {
    setSrc(primary);
    setFailedOnce(false);
  }, [primary]);

  const onError = () => {
    if (!failedOnce) {
      setFailedOnce(true);
      setSrc(fallback);
    }
  };

  return { src, onError, usingFallback: failedOnce };
}
