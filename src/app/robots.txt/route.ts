import { NextResponse } from 'next/server';

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://madmachines.vercel.app'}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}