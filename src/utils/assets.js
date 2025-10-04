import { prefixPath } from './basePath';

export const ASSETS = {
  logos: (file) => prefixPath(`/imagenes/${file}`),
  fotos: (file) => prefixPath(`/fotos/${file}`),
};
