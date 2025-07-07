'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) return;
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="ascii-border p-8 ethereal-glow">
              <div className="text-green-500 font-mono text-center">
                Loading<span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="ascii-border p-8 ethereal-glow">
              <h1 className="text-red-500 font-mono text-2xl glow mb-4">
                [ERROR_404]
              </h1>
              <p className="text-green-500 font-mono">
                Post not found in the digital void.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="ascii-border p-6 sm:p-8 ethereal-glow">
            <header className="mb-8">
              <h1 className="text-green-500 font-mono text-xl sm:text-2xl mb-4 glow">
                {post.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 text-green-400 font-mono text-sm">
                <time>
                  {new Date(post.created_at).toISOString().slice(0, 19).replace('T', ' ')} UTC
                </time>
                {post.updated_at !== post.created_at && (
                  <span>
                    Updated: {new Date(post.updated_at).toISOString().slice(0, 19).replace('T', ' ')} UTC
                  </span>
                )}
              </div>
            </header>
            
            <div className="prose prose-invert prose-green max-w-none">
              <ReactMarkdown 
                components={{
                  h1: ({children}) => <h1 className="text-green-500 font-mono text-xl glow mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-green-500 font-mono text-lg glow mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-green-500 font-mono text-base glow mt-4 mb-2">{children}</h3>,
                  p: ({children}) => <p className="text-green-500 font-mono mb-4 leading-relaxed">{children}</p>,
                  code: ({children}) => <code className="text-green-400 bg-green-900/20 px-1 py-0.5 rounded font-mono text-sm">{children}</code>,
                  pre: ({children}) => <pre className="bg-green-900/20 border border-green-500 p-4 rounded overflow-x-auto my-4">{children}</pre>,
                  blockquote: ({children}) => <blockquote className="border-l-2 border-green-500 pl-4 italic text-green-400 my-4">{children}</blockquote>,
                  ul: ({children}) => <ul className="list-disc list-inside text-green-500 font-mono space-y-1 mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside text-green-500 font-mono space-y-1 mb-4">{children}</ol>,
                  li: ({children}) => <li className="text-green-500 font-mono">{children}</li>,
                  a: ({children, href}) => <a href={href} className="text-green-400 hover:text-green-300 underline transition-colors">{children}</a>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
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