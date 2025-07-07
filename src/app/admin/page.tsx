'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from '@/components/Header';
import GenerativeBackground from '@/components/GenerativeBackground';
import dynamic from 'next/dynamic';
import type { Session } from '@supabase/supabase-js';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

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

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      const { error } = await supabase
        .from('posts')
        .update({
          ...newPost,
          slug: newPost.slug || newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        })
        .eq('id', editingPost.id);

      if (error) {
        console.error('Error updating post:', error);
      } else {
        setNewPost({ title: '', content: '', excerpt: '', slug: '', published: false });
        setEditingPost(null);
        setIsCreating(false);
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from('posts')
        .insert([{
          ...newPost,
          slug: newPost.slug || newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }]);

      if (error) {
        console.error('Error creating post:', error);
      } else {
        setNewPost({ title: '', content: '', excerpt: '', slug: '', published: false });
        setIsCreating(false);
        fetchPosts();
      }
    }
  };

  const handleEdit = (post: Post) => {
    setNewPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      published: post.published
    });
    setEditingPost(post);
    setIsCreating(true);
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
      } else {
        fetchPosts();
      }
    }
  };

  const handleCancel = () => {
    setNewPost({ title: '', content: '', excerpt: '', slug: '', published: false });
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-black relative">
        <GenerativeBackground variant="grid" />
        <Header />
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-md mx-auto">
            <div className="ascii-border p-8 ethereal-glow">
              <h1 className="text-green-500 font-mono text-xl mb-6 glow text-center">
                [ADMIN_ACCESS]
              </h1>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#00ff00',
                        brandAccent: '#00cc00',
                        brandButtonText: '#000000',
                        defaultButtonBackground: '#000000',
                        defaultButtonBackgroundHover: '#111111',
                        defaultButtonBorder: '#00ff00',
                        defaultButtonText: '#00ff00',
                        dividerBackground: '#00ff00',
                        inputBackground: '#000000',
                        inputBorder: '#00ff00',
                        inputBorderHover: '#00cc00',
                        inputBorderFocus: '#00ff00',
                        inputText: '#00ff00',
                        inputLabelText: '#00ff00',
                        inputPlaceholder: '#006600',
                        messageText: '#00ff00',
                        messageTextDanger: '#ff0000',
                        anchorTextColor: '#00ff00',
                        anchorTextHoverColor: '#00cc00',
                      },
                      fonts: {
                        bodyFontFamily: 'JetBrains Mono, monospace',
                        buttonFontFamily: 'JetBrains Mono, monospace',
                        inputFontFamily: 'JetBrains Mono, monospace',
                        labelFontFamily: 'JetBrains Mono, monospace',
                      },
                    },
                  },
                }}
                providers={[]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <GenerativeBackground variant="particles" />
      <Header />
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-green-500 font-mono text-xl sm:text-2xl glow">
              [ADMIN_PANEL]
            </h1>
            <div className="flex gap-2 sm:gap-4">
              <button
                onClick={() => setIsCreating(true)}
                className="ascii-border px-3 py-2 sm:px-4 text-green-500 hover:text-green-400 transition-colors text-sm sm:text-base"
              >
                [NEW_POST]
              </button>
              <button
                onClick={handleSignOut}
                className="ascii-border px-3 py-2 sm:px-4 text-red-500 hover:text-red-400 transition-colors text-sm sm:text-base"
              >
                [LOGOUT]
              </button>
            </div>
          </div>

          {isCreating && (
            <div className="ascii-border p-4 sm:p-6 mb-8 ethereal-glow">
              <h3 className="text-green-500 font-mono text-lg mb-4 glow">
                {editingPost ? '[EDIT_POST]' : '[NEW_POST]'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-green-500 font-mono text-sm mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full bg-black border border-green-500 text-green-500 font-mono px-3 py-2 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-500 font-mono text-sm mb-2">
                    Slug:
                  </label>
                  <input
                    type="text"
                    value={newPost.slug}
                    onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
                    className="w-full bg-black border border-green-500 text-green-500 font-mono px-3 py-2 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                    placeholder="auto-generated if empty"
                  />
                </div>
                
                <div>
                  <label className="block text-green-500 font-mono text-sm mb-2">
                    Excerpt:
                  </label>
                  <input
                    type="text"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    className="w-full bg-black border border-green-500 text-green-500 font-mono px-3 py-2 focus:outline-none focus:border-green-400 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-green-500 font-mono text-sm mb-2">
                    Content:
                  </label>
                  <div className="md-editor-dark">
                    <MDEditor
                      value={newPost.content}
                      onChange={(value) => setNewPost({...newPost, content: value || ''})}
                      data-color-mode="dark"
                      preview="edit"
                      height={300}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={newPost.published}
                    onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                    className="text-green-500"
                  />
                  <label htmlFor="published" className="text-green-500 font-mono text-sm">
                    Published
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <button
                    type="submit"
                    className="ascii-border px-4 py-2 text-green-500 hover:text-green-400 transition-colors text-sm sm:text-base"
                  >
                    [{editingPost ? 'UPDATE' : 'SAVE'}]
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="ascii-border px-4 py-2 text-red-500 hover:text-red-400 transition-colors text-sm sm:text-base"
                  >
                    [CANCEL]
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-green-500 font-mono text-xl glow">
              [POSTS]
            </h2>
            {posts.map((post) => (
              <div key={post.id} className="ascii-border p-4 hover:ethereal-glow transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-green-500 font-mono text-base sm:text-lg mb-1">
                      {post.title}
                    </h3>
                    <p className="text-green-400 font-mono text-xs sm:text-sm mb-2">
                      {new Date(post.created_at).toISOString().slice(0, 19).replace('T', ' ')} UTC
                    </p>
                    <p className="text-green-500 font-mono text-xs sm:text-sm">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono text-xs px-2 py-1 border ${
                      post.published 
                        ? 'text-green-500 border-green-500' 
                        : 'text-yellow-500 border-yellow-500'
                    }`}>
                      {post.published ? '[LIVE]' : '[DRAFT]'}
                    </span>
                    <button
                      onClick={() => handleEdit(post)}
                      className="ascii-border px-2 py-1 text-blue-500 hover:text-blue-400 transition-colors text-xs"
                    >
                      [EDIT]
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="ascii-border px-2 py-1 text-red-500 hover:text-red-400 transition-colors text-xs"
                    >
                      [DELETE]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}