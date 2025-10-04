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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Panel de Administrador
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  CPC UGR - Sistema de gestión
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                {activeSection === 'dashboard' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Dashboard
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Estadísticas */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Usuarios</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">42</p>
                          </div>
                          <Users className="h-10 w-10 text-blue-500" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">Lecciones</p>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">28</p>
                          </div>
                          <Book className="h-10 w-10 text-green-500" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Eventos</p>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">12</p>
                          </div>
                          <Calendar className="h-10 w-10 text-purple-500" />
                        </div>
                      </div>
                    </div>

                    {/* Actividad reciente */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Actividad Reciente
                      </h3>
                      <div className="space-y-3">
                        {[
                          { action: 'Nuevo usuario registrado', time: 'Hace 2 horas', user: 'usuario@ejemplo.com' },
                          { action: 'Lección publicada', time: 'Hace 5 horas', user: 'Arrays Dinámicos' },
                          { action: 'Evento creado', time: 'Hace 1 día', user: 'Competición Mensual' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.user}</p>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
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
                  <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500">
                      {menuItems.find(item => item.id === activeSection)?.icon && (
                        <div className="inline-block mb-4">
                          {(() => {
                            const Icon = menuItems.find(item => item.id === activeSection).icon;
                            return <Icon className="h-16 w-16" />;
                          })()}
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {menuItems.find(item => item.id === activeSection)?.label}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Esta sección está en desarrollo
                      </p>
                    </div>
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
