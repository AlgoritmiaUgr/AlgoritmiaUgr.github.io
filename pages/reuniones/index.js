import Link from 'next/link';
import Head from 'next/head';
import { prefixPath } from '../../src/utils/basePath';
import { redis } from '../../src/lib/upstash';

export async function getStaticProps() {
  try {
    const keys = await redis.keys('meeting:*');
    const meetings = await Promise.all(
      keys.map(async (key) => await redis.get(key))
    );
    
    const validMeetings = meetings.filter(Boolean);
    
    // Orden descendente por fecha
    const posts = [...validMeetings].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    
    return {
      props: { posts },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error loading meetings:', error);
    return {
      props: { posts: [] },
      revalidate: 60
    };
  }
}

export default function ReunionesIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Reuniones | CPC UGR</title>
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-5 bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red bg-clip-text text-transparent">
            Reuniones
          </h1>
          <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">
            Publicaciones con el resumen de cada reunión: fotos, notas y recursos.
          </p>
          <div className="flex justify-center">
            <div className="w-28 h-[3px] bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red rounded-full"></div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Aún no hay reuniones publicadas.</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/reuniones/${post.slug}`} className="group">
                <div className="rounded-2xl overflow-hidden bg-white/60 dark:bg-white/[0.05] border border-black/5 dark:border-white/10 shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-video bg-white/40 dark:bg-white/[0.04]">
                    {post.photos && post.photos.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.photos[0]} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-warm-orange/15 via-warm-pink/10 to-warm-red/15" />
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-light text-black dark:text-white mb-1 group-hover:text-warm-orange transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {post.date ? new Date(post.date).toLocaleDateString('es-ES') : ''} {post.location ? `· ${post.location}` : ''}
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70 line-clamp-3 mb-4">{post.excerpt}</p>
                    {post.tags?.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
