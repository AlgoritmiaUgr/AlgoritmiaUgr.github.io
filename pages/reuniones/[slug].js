import Head from 'next/head';
import { prefixPath } from '../../src/utils/basePath';
import { meetings } from '../../src/data/meetings';

export async function getStaticPaths() {
  return {
    paths: meetings.map(m => ({ params: { slug: m.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const meeting = meetings.find(m => m.slug === params.slug) || null;
  return { props: { meeting } };
}

export default function ReunionPost({ meeting }) {
  if (!meeting) return null;
  const { title, date, cover, location, content } = meeting;
  return (
    <>
      <Head>
        <title>{title} | Reuniones</title>
      </Head>
      <article className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-light text-black dark:text-white mb-2">{title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {date ? new Date(date).toLocaleDateString('es-ES') : ''} {location ? `· ${location}` : ''}
          </div>
        </header>
        {cover && (
          <img src={prefixPath(cover)} alt={title} className="rounded-xl w-full object-cover mb-6" />
        )}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content.split('\n').map((line,i) => line.trim().startsWith('#') ? (
            <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace(/^#+\s*/, '')}</h2>
          ) : line.trim() === '' ? <div key={i} className="h-2" /> : (
            <p key={i} className="mb-3 leading-relaxed">{line}</p>
          ))}
        </div>
      </article>
    </>
  );
}
