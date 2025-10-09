import { useRouter } from 'next/router';

const MobileMenu = ({ 
  isOpen, 
  onClose,
}) => {
  const router = useRouter();

  const navItems = [
    { label: 'Aprende', path: '/aprende' },
    { label: 'Compite', path: '/compite' },
    { label: 'Comparte', path: '/comparte' },
  ];

  const handleNavClick = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {/* Overlay - solo visible cuando está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Menu - Desde la derecha */}
      <aside className={`fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-pure-white/95 dark:bg-pure-black/95 backdrop-blur-md border-l border-black/10 dark:border-white/10 overflow-y-auto z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
      }`}>
        <div className="px-4 py-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-3">
            Navegación
          </h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-4 py-2 text-sm font-light transition-colors duration-200 bg-transparent border-0 ${
                  router.pathname === item.path
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-700 dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                }`}
                style={{ background: 'transparent' }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
