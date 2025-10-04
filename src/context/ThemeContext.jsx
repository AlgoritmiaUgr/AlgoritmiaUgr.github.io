import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Modo del tema: 'light' | 'dark' (sin opción sistema, pero se usa como valor inicial)
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Optimización: useCallback para evitar recrear la función en cada render
  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Optimización: useMemo para memoizar el valor del contexto
  const effectiveIsDark = mode === 'dark';

  const value = useMemo(() => ({
    isDark: effectiveIsDark,
    mode,
    setMode,
    toggleTheme,
    mounted, // Añadir mounted al contexto para optimizaciones
  }), [effectiveIsDark, mode, toggleTheme, mounted]);

  // Efecto para cargar la preferencia guardada después del primer render (solo en cliente)
  useEffect(() => {
    setMounted(true);

    // Migración de clave antigua si existe
    const legacy = localStorage.getItem('theme');
    if (legacy === 'dark' || legacy === 'light') {
      localStorage.setItem('themeMode', legacy);
      localStorage.removeItem('theme');
    }

    // Cargar modo guardado o por defecto a preferencia del sistema como inicial
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Efecto para aplicar el tema cuando cambia
  useEffect(() => {
    if (!mounted) return;

  // Persistir modo seleccionado
  localStorage.setItem('themeMode', mode);

    // Aplicar clase según modo efectivo
    if (effectiveIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, effectiveIsDark, mounted]);

  // No renderizar hasta que el componente esté montado para evitar hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ isDark: false, mode: 'light', setMode: () => {}, toggleTheme: () => {}, mounted: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 