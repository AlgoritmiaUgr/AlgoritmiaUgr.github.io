import Head from 'next/head';
import { prefixPath } from '../../src/utils/basePath';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { redis } from '../../src/lib/upstash';

export async function getStaticPaths() {
  try {
    const keys = await redis.keys('meeting:*');
    const meetings = await Promise.all(
      keys.map(async (key) => await redis.get(key))
    );
    
    const validMeetings = meetings.filter(Boolean);
    
    return {
      paths: validMeetings.map(m => ({ params: { slug: m.slug } })),
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error loading meetings for paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const keys = await redis.keys('meeting:*');
    const meetings = await Promise.all(
      keys.map(async (key) => await redis.get(key))
    );
    
    const meeting = meetings.find(m => m && m.slug === params.slug) || null;
    
    return { 
      props: { meeting },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error loading meeting:', error);
    return { 
      props: { meeting: null },
      revalidate: 60
    };
  }
}

export default function ReunionPost({ meeting }) {
  if (!meeting) return null;
  
  const { title, date, photos, content } = meeting;
  
  return (
    <>
      <Head>
        <title>{title} | Reuniones</title>
      </Head>
      <article className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-light text-black dark:text-white mb-2">{title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {date ? new Date(date).toLocaleDateString('es-ES') : ''}
          </div>
        </header>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
        
        {photos && photos.length > 0 && (
          <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
            <h2 className="text-xl font-light text-black dark:text-white mb-4">Galería de Fotos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Foto ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg border border-black/10 dark:border-white/10"
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
