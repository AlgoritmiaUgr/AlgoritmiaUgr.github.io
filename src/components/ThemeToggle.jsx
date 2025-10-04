import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { memo } from 'react';

const ThemeToggle = memo(() => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-pure-black hover:bg-gray-300 dark:hover:bg-deeper-black transition-all duration-300 ease-in-out transform hover:scale-105"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 h-6 w-6 text-yellow-500 transition-all duration-300 ${
            isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-6 w-6 text-blue-400 transition-all duration-300 ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
          }`}
        />
      </div>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle; 