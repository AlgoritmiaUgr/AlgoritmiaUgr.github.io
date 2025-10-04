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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
        {/* Header */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Panel de Administrador
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">
                  CPC UGR - Sistema de gestión
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-semibold">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Navegación
                  </h2>
                </div>
                <nav className="space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all transform ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 text-red-600 dark:text-red-400 shadow-md border border-red-500/20 dark:border-red-500/30 scale-105'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102'
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-semibold text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
                {activeSection === 'dashboard' && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                        Dashboard
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Resumen general del sistema
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Estadísticas */}
                      <div className="group bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all transform hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Usuarios</p>
                            <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 mt-3">42</p>
                            <p className="text-xs text-blue-600/60 dark:text-blue-400/60 mt-2">+12% este mes</p>
                          </div>
                          <div className="bg-blue-500/10 dark:bg-blue-500/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                          </div>
                        </div>
                      </div>

                      <div className="group bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all transform hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">Lecciones</p>
                            <p className="text-4xl font-bold text-green-900 dark:text-green-100 mt-3">28</p>
                            <p className="text-xs text-green-600/60 dark:text-green-400/60 mt-2">5 publicadas</p>
                          </div>
                          <div className="bg-green-500/10 dark:bg-green-500/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                            <Book className="h-10 w-10 text-green-500 dark:text-green-400" />
                          </div>
                        </div>
                      </div>

                      <div className="group bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all transform hover:scale-105 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Eventos</p>
                            <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mt-3">12</p>
                            <p className="text-xs text-purple-600/60 dark:text-purple-400/60 mt-2">3 próximos</p>
                          </div>
                          <div className="bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                            <Calendar className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actividad reciente */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Actividad Reciente
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Últimas acciones en el sistema
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { action: 'Nuevo usuario registrado', time: 'Hace 2 horas', user: 'usuario@ejemplo.com', type: 'user' },
                          { action: 'Lección publicada', time: 'Hace 5 horas', user: 'Arrays Dinámicos', type: 'lesson' },
                          { action: 'Evento creado', time: 'Hace 1 día', user: 'Competición Mensual', type: 'event' },
                        ].map((item, index) => (
                          <div key={index} className="group flex items-center justify-between p-5 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-md">
                            <div className="flex items-center space-x-4">
                              <div className={`p-2.5 rounded-lg ${
                                item.type === 'user' ? 'bg-blue-500/10 dark:bg-blue-500/20' :
                                item.type === 'lesson' ? 'bg-green-500/10 dark:bg-green-500/20' :
                                'bg-purple-500/10 dark:bg-purple-500/20'
                              }`}>
                                {item.type === 'user' && <Users className="h-5 w-5 text-blue-500" />}
                                {item.type === 'lesson' && <Book className="h-5 w-5 text-green-500" />}
                                {item.type === 'event' && <Calendar className="h-5 w-5 text-purple-500" />}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.action}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.user}</p>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                              {item.time}
                            </span>
                          </div>
                        ))}
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
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mb-6">
                      {menuItems.find(item => item.id === activeSection)?.icon && (
                        (() => {
                          const Icon = menuItems.find(item => item.id === activeSection).icon;
                          return <Icon className="h-10 w-10 text-gray-400 dark:text-gray-500" />;
                        })()
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {menuItems.find(item => item.id === activeSection)?.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Esta sección está en desarrollo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
