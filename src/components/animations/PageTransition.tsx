import { useEffect, useState } from 'react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`page-transition ${isEntered ? 'page-transition--entered' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;
