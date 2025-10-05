import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/context/AuthContext';
import Layout from '../../src/components/Layout';
import ContentManager from '../../src/components/ContentManager';
import { 
  LogOut, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  BarChart,
  MessageSquare,
  Trophy,
  Book
} from 'lucide-react';

export default function AdminPanel() {
  const router = useRouter();
  const { isAuthenticated, logout, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

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
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'content', label: 'Contenido', icon: FileText },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'competitions', label: 'Competiciones', icon: Trophy },
    { id: 'lessons', label: 'Lecciones', icon: Book },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare },
    { id: 'settings', label: 'Configuración', icon: Settings },
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

        {/* Header */}
        <div className="sticky top-16 z-40 bg-pure-white/80 dark:bg-pure-black/80 backdrop-blur-sm border-b border-black/5 dark:border-pure-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light text-black dark:text-pure-white">
                  Panel de Administrador
                </h1>
                <p className="text-sm font-light text-black/60 dark:text-pure-white/60 mt-1">
                  CPC UGR - Sistema de gestión
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 transition-all font-light ${
                        activeSection === item.id
                          ? 'text-red-500 dark:text-red-400 border-l-2 border-red-500 dark:border-red-400 bg-red-500/5'
                          : 'text-black/70 dark:text-pure-white/70 hover:text-black dark:hover:text-pure-white border-l-2 border-transparent'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeSection === 'dashboard' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-light text-black dark:text-pure-white mb-2">
                      Dashboard
                    </h2>
                    <p className="text-sm font-light text-black/60 dark:text-pure-white/60">
                      Resumen general del sistema
                    </p>
                  </div>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border-l-2 border-black/10 dark:border-pure-white/10 hover:border-red-500 dark:hover:border-red-400 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <Users className="h-8 w-8 text-black/40 dark:text-pure-white/40" strokeWidth={1} />
                      </div>
                      <p className="text-xs font-light text-black/60 dark:text-pure-white/60 uppercase tracking-wider mb-2">
                        Usuarios
                      </p>
                      <p className="text-4xl font-light text-black dark:text-pure-white">42</p>
                      <p className="text-xs font-light text-black/40 dark:text-pure-white/40 mt-2">
                        +12% este mes
                      </p>
                    </div>

                    <div className="p-6 border-l-2 border-black/10 dark:border-pure-white/10 hover:border-red-500 dark:hover:border-red-400 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <Book className="h-8 w-8 text-black/40 dark:text-pure-white/40" strokeWidth={1} />
                      </div>
                      <p className="text-xs font-light text-black/60 dark:text-pure-white/60 uppercase tracking-wider mb-2">
                        Lecciones
                      </p>
                      <p className="text-4xl font-light text-black dark:text-pure-white">28</p>
                      <p className="text-xs font-light text-black/40 dark:text-pure-white/40 mt-2">
                        5 publicadas
                      </p>
                    </div>

                    <div className="p-6 border-l-2 border-black/10 dark:border-pure-white/10 hover:border-red-500 dark:hover:border-red-400 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <Calendar className="h-8 w-8 text-black/40 dark:text-pure-white/40" strokeWidth={1} />
                      </div>
                      <p className="text-xs font-light text-black/60 dark:text-pure-white/60 uppercase tracking-wider mb-2">
                        Eventos
                      </p>
                      <p className="text-4xl font-light text-black dark:text-pure-white">12</p>
                      <p className="text-xs font-light text-black/40 dark:text-pure-white/40 mt-2">
                        3 próximos
                      </p>
                    </div>
                  </div>

                  {/* Actividad reciente */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-light text-black dark:text-pure-white mb-1">
                        Actividad Reciente
                      </h3>
                      <p className="text-sm font-light text-black/60 dark:text-pure-white/60">
                        Últimas acciones en el sistema
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { action: 'Nuevo usuario registrado', time: 'Hace 2 horas', user: 'usuario@ejemplo.com', icon: Users },
                        { action: 'Lección publicada', time: 'Hace 5 horas', user: 'Arrays Dinámicos', icon: Book },
                        { action: 'Evento creado', time: 'Hace 1 día', user: 'Competición Mensual', icon: Calendar },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center justify-between py-4 border-b border-black/5 dark:border-pure-white/5">
                            <div className="flex items-center space-x-4">
                              <Icon className="h-5 w-5 text-black/40 dark:text-pure-white/40" strokeWidth={1.5} />
                              <div>
                                <p className="text-sm font-light text-black dark:text-pure-white">{item.action}</p>
                                <p className="text-xs font-light text-black/60 dark:text-pure-white/60">{item.user}</p>
                              </div>
                            </div>
                            <span className="text-xs font-light text-black/40 dark:text-pure-white/40">
                              {item.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Gestor de Contenidos */}
              {activeSection === 'content' && (
                <ContentManager />
              )}

              {/* Otras secciones en desarrollo */}
              {activeSection !== 'dashboard' && activeSection !== 'content' && (
                <div className="text-center py-24">
                  {menuItems.find(item => item.id === activeSection)?.icon && (
                    (() => {
                      const Icon = menuItems.find(item => item.id === activeSection).icon;
                      return <Icon className="h-16 w-16 text-black/20 dark:text-pure-white/20 mx-auto mb-6" strokeWidth={1} />;
                    })()
                  )}
                  <h3 className="text-2xl font-light text-black dark:text-pure-white mb-2">
                    {menuItems.find(item => item.id === activeSection)?.label}
                  </h3>
                  <p className="text-sm font-light text-black/60 dark:text-pure-white/60">
                    Esta sección está en desarrollo
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
