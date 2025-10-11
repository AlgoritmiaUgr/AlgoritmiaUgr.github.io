import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_TITLE = 'Club de Programación Competitiva UGR';
const DEFAULT_DESCRIPTION = 'Comunidad universitaria dedicada a la programación competitiva en Granada. Aprende algoritmos, estructuras de datos y resuelve problemas de forma colaborativa.';
const SITE_URL = 'https://cpcugr.vercel.app';
const TWITTER_HANDLE = '@AlgoritmiaUgr';

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = `${SITE_URL}/api/og?title=${encodeURIComponent(DEFAULT_TITLE)}`,
  article = false,
  publishedTime,
  modifiedTime,
  author,
}) {
  const router = useRouter();
  const canonicalUrl = `${SITE_URL}${router.asPath}`;
  const siteTitle = title === DEFAULT_TITLE ? title : `${title} | ${DEFAULT_TITLE}`;

  return (
    <Head>
      {/* Título y descripción básicos */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Club de Programación Competitiva UGR" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Article-specific metadata */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="es" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': article ? 'Article' : 'WebSite',
          name: siteTitle,
          description: description,
          url: canonicalUrl,
          publisher: {
            '@type': 'Organization',
            name: 'Club de Programación Competitiva UGR',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/imagenes/logo_oscuro.svg`,
            },
          },
          ...(article && {
            datePublished: publishedTime,
            dateModified: modifiedTime,
            author: {
              '@type': 'Person',
              name: author,
            },
          }),
        })}
      </script>
    </Head>
  );
}