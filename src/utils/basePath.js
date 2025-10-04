export const getBasePath = () => process.env.NEXT_PUBLIC_BASE_PATH || '';

export const prefixPath = (p = '') => {
  if (!p) return p;
  const base = getBasePath();
  // Only prefix root-relative paths
  if (p.startsWith('/')) {
    return `${base}${p}`;
  }
  return p;
};
