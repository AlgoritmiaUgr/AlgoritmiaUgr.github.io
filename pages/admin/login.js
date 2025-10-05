import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import { useAuth } from '../../src/context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Credenciales incorrectas');
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-pure-white dark:bg-pure-black relative overflow-hidden">
        {/* Background Effects - Igual que la web principal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Light mode clouds */}
          <div className="dark:hidden">
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-warm-orange/30 via-warm-pink/20 to-transparent blur-3xl animate-cloud-glow"></div>
            <div className="absolute top-1/3 -left-32 w-[250px] h-[250px] bg-gradient-radial from-warm-red/25 via-warm-orange/15 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-1/4 w-[200px] h-[200px] bg-gradient-radial from-warm-pink/35 via-warm-red/20 to-transparent blur-xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Dark mode clouds - solo blanco */}
          <div className="hidden dark:block">
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-white/20 via-white/10 to-transparent blur-3xl animate-cloud-glow"></div>
            <div className="absolute top-1/3 -left-32 w-[250px] h-[250px] bg-gradient-radial from-white/18 via-white/8 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-1/4 w-[200px] h-[200px] bg-gradient-radial from-white/25 via-white/12 to-transparent blur-xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        <div className="max-w-md w-full space-y-12 relative z-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center mb-8">
              <Lock className="h-16 w-16 text-black dark:text-pure-white opacity-60" strokeWidth={1} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-black dark:text-pure-white leading-tight mb-3">
              Panel de Administrador
            </h2>
            <p className="text-sm font-light text-black/70 dark:text-pure-white/70">
              CPC UGR - Acceso restringido
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-light text-black dark:text-pure-white mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-black/40 dark:text-pure-white/40" strokeWidth={1.5} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-4 py-3 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition-colors font-light"
                  placeholder="admin@cpcugr.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-light text-black dark:text-pure-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-black/40 dark:text-pure-white/40" strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-12 py-3 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 transition-colors font-light"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-black/40 dark:text-pure-white/40 bg-transparent hover:text-black/70 dark:hover:text-pure-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1.5} /> : <Eye className="h-5 w-5" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="py-3 px-4 border-l-2 border-red-500 bg-red-500/5">
                <p className="text-sm font-light text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-transparent border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Footer Info */}
          <div className="text-center pt-8 border-t border-black/10 dark:border-pure-white/10">
            <p className="text-xs font-light text-black/50 dark:text-pure-white/50">
              Acceso exclusivo para administradores del CPC UGR
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
