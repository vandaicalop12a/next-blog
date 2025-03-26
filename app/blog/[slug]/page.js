import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, getPostBySlug, formatDate } from '@/lib/utils';
import BlocksRendererComponent from '@/components/BlocksRenderer';
import ParallaxText from '@/components/animations/ParallaxText';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://yourblog.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
  // Debug log để xem dữ liệu thực tế
  console.log('Debug post detail:', JSON.stringify(post, null, 2));

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-6">
      <div className="mb-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-purple-500 hover:text-purple-700 transition-colors mb-6"
        >
          <svg 
            className="mr-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to posts
        </Link>
        
        <ParallaxText as="h1" className="text-3xl md:text-4xl font-bold mb-3">
          {post.title || 'Untitled Post'}
        </ParallaxText>
        
        <div className="text-neutral-600 dark:text-neutral-400 text-sm fade-in-element">
          <time dateTime={post.date || ''}>
            {post.date ? formatDate(post.date) : 'No date'}
          </time>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {post.content && Array.isArray(post.content) ? (
          <BlocksRendererComponent content={post.content} />
        ) : (
          <p>No content available for this post.</p>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="stagger-list">
          <h3 className="stagger-item text-xl font-medium mb-4">Related Posts</h3>
          <div className="stagger-item flex flex-col space-y-3">
            <Link 
              href="/blog/bai-viet-1" 
              className="text-purple-500 hover:text-purple-700 transition-colors hover:underline"
            >
              Sample Post 1
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
} 