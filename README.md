# madmachines // digital thoughts

A minimal ASCII-themed blog built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 Minimal ASCII/terminal aesthetic with ethereal green glow
- 📱 Responsive design optimized for all devices
- 🔐 Authentication system with Supabase Auth
- 📝 Admin panel for creating and managing blog posts
- 🚀 Optimized for SEO with meta tags, sitemap, and robots.txt
- ⚡ Fast performance with Next.js 14 and server components
- 🌐 Ready for deployment on Vercel

## Setup

1. **Clone the repository**
   ```bash
   cd madmachines-blog
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL from `database.sql` in your Supabase SQL editor
   - Update `.env.local` with your Supabase credentials

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Blog: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

## Database Schema

The blog uses a simple `posts` table with the following fields:
- `id`: UUID primary key
- `title`: Post title
- `content`: Post content (markdown supported)
- `excerpt`: Short description
- `slug`: URL-friendly identifier
- `published`: Boolean flag
- `created_at`: Timestamp
- `updated_at`: Timestamp (auto-updated)

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automatically on push

### Alternative Deployments
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Cloudflare Pages**: Connect repository and configure build settings

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Font**: JetBrains Mono
- **Deployment**: Vercel
- **Styling**: Custom ASCII/terminal theme with green glow effects

## Design Philosophy

The blog embraces minimalism with an ASCII/terminal aesthetic, featuring:
- Monospace typography (JetBrains Mono)
- Green-on-black color scheme
- Subtle borders and glow effects
- ASCII art elements
- Terminal-inspired UI components

Perfect for developers, writers, and thinkers who appreciate the beauty of simplicity and the elegance of the command line.
