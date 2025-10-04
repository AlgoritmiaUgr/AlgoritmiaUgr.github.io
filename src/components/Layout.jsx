import { memo } from 'react';

const Layout = memo(({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {children}
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout; 