import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function useCachedImage(url: string | undefined, cacheKey: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        
        // Check cache first
        const cachedBlob = await get(cacheKey);
        
        if (cachedBlob && cachedBlob instanceof Blob) {
          if (isMounted) {
            const objectUrl = URL.createObjectURL(cachedBlob);
            setImageSrc(objectUrl);
            setIsLoading(false);
          }
          return;
        }

        // Fetch if not in cache
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const blob = await response.blob();
        
        // Save to cache
        try {
          await set(cacheKey, blob);
        } catch (err) {
          console.warn('Failed to cache image:', err);
        }

        if (isMounted) {
          const objectUrl = URL.createObjectURL(blob);
          setImageSrc(objectUrl);
          setIsLoading(false);
        }
      } catch (err) {
        // Log as warning instead of error since we have a fallback
        console.warn('Image load failed, using fallback:', err);
        if (isMounted) {
          setError(true);
          // Fallback to original URL if caching fails, 
          // but if fetch failed, the original URL might also fail or be slow.
          // We'll set imageSrc to null so the img tag triggers onError and uses the component-level fallback
          setImageSrc(null); 
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      // Note: We don't revoke object URLs here immediately to avoid flickering if component remounts fast,
      // but in a real large app we should manage memory. 
      // For this scale, letting the browser handle it or revoking on unmount is fine.
    };
  }, [url, cacheKey]);

  return { imageSrc, isLoading, error };
}
