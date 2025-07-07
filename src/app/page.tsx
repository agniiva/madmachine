import Header from '@/components/Header';
import GenerativeBackground from '@/components/GenerativeBackground';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-black relative">
      <GenerativeBackground variant="matrix" />
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="ascii-border p-8 mb-8 ethereal-glow">
            <div className="ascii-art mb-4">
{`
    ░█▀▀▀█ ▀▀█▀▀ ░█▀▀▀█ ░█▀▀▀ ░█▀▀▀█ ░█▀▀▀
    ░█▀▀▀▀ ░░█░░ ░█▀▀▀▀ ░█▀▀▀ ░█▀▀▀▀ ░█▀▀▀
    ░█▄▄▄█ ░░█░░ ░█▄▄▄█ ░█▄▄▄ ░█▄▄▄█ ░█▄▄▄
`}
            </div>
            <p className="text-green-500 font-mono text-lg">
              Random intellectual musings from the digital void<span className="terminal-cursor"></span>
            </p>
          </div>

          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <a key={post.id} href={`/post/${post.slug}`} className="block">
                  <div className="ascii-border p-6 hover:ethereal-glow transition-all duration-300 cursor-pointer">
                    <h2 className="text-green-500 font-mono text-xl mb-3 glow">
                      [POST_{String(index + 1).padStart(3, '0')}] {post.title}
                    </h2>
                    <p className="text-green-400 font-mono text-sm mb-2">
                      {new Date(post.created_at).toISOString().slice(0, 19).replace('T', ' ')} UTC
                    </p>
                    <p className="text-green-500 font-mono leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="ascii-border p-6 hover:ethereal-glow transition-all duration-300">
                <h2 className="text-green-500 font-mono text-xl mb-3 glow">
                  [POST_001] Hello, World!
                </h2>
                <p className="text-green-400 font-mono text-sm mb-2">
                  2024-01-01 00:00:00 UTC
                </p>
                <p className="text-green-500 font-mono leading-relaxed">
                  Welcome to madmachines - a place where thoughts collide with code, 
                  where algorithms dance with philosophy, and where the terminal 
                  never sleeps. This is the beginning of something beautiful.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-green-500 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-500 font-mono text-sm">
            © 2024 madmachines // powered by electrons and dreams
          </p>
        </div>
      </footer>
    </div>
  );
}
