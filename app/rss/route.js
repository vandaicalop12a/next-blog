import { getBlogPosts } from '@/lib/utils';
import { baseUrl } from '@/app/sitemap';

export async function GET() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const rssXml = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>My Blog</title>
        <link>${baseUrl}</link>
        <description>Personal blog about programming, technology, and more</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${sortedPosts
          .map(
            (post) => `
            <item>
              <title>${post.metadata.title}</title>
              <link>${baseUrl}/blog/${post.slug}</link>
              <description>${post.metadata.summary}</description>
              <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
              <guid>${baseUrl}/blog/${post.slug}</guid>
            </item>
          `
          )
          .join('')}
      </channel>
    </rss>
  `.trim();

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const dynamic = 'force-dynamic'; 