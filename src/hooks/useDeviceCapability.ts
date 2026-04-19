import { useMemo } from 'react';

type DeviceCapability = 'high' | 'low';

export const useDeviceCapability = (): DeviceCapability => {
  return useMemo(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low';
    }

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return 'low';
    } catch {
      return 'low';
    }

    // Check hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      return 'low';
    }

    // Check device memory (Chrome only)
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory < 4) {
      return 'low';
    }

    return 'high';
  }, []);
};
