import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/context/AuthContext';
import Layout from '../../src/components/Layout';
import ContentManager from '../../src/components/ContentManager';
import { 
  LogOut, 
  FileText
} from 'lucide-react';

export default function AdminPanel() {
  const router = useRouter();
  const { isAuthenticated, logout, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('content');

  // Redirigir si no está autenticado
  if (!isLoading && !isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-pure-white dark:bg-pure-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-pure-white mx-auto opacity-60"></div>
            <p className="mt-4 text-sm font-light text-black/60 dark:text-pure-white/60">Cargando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const menuItems = [
    { id: 'content', label: 'Gestor de Contenidos', icon: FileText },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-pure-white dark:bg-pure-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Light mode clouds */}
          <div className="dark:hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-warm-orange/20 via-warm-pink/10 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-warm-red/15 via-transparent to-transparent blur-3xl"></div>
          </div>
          
          {/* Dark mode clouds */}
          <div className="hidden dark:block">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-white/15 via-white/8 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-white/10 via-transparent to-transparent blur-3xl"></div>
          </div>
        </div>

        {/* Header - No sticky para evitar colisión */}
        <div className="border-b border-black/5 dark:border-pure-white/5 bg-pure-white dark:bg-pure-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-between items-center py-3 gap-3">
              <div>
                <h1 className="text-lg font-light text-black dark:text-pure-white">
                  Panel de Administrador
                </h1>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-xs">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar - Más estrecho */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all font-light text-sm bg-transparent ${
                        activeSection === item.id
                          ? 'text-red-500 dark:text-red-400 border-l-2 border-red-500 dark:border-red-400 bg-red-500/5 dark:bg-transparent'
                          : 'text-black/70 dark:text-pure-white/70 hover:text-black dark:hover:text-pure-white border-l-2 border-transparent hover:bg-black/5 dark:hover:bg-pure-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content - Más ancho */}
            <div className="lg:col-span-4">
              <ContentManager />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
