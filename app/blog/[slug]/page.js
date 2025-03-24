import { notFound } from 'next/navigation';
import { getBlogPosts, getPostBySlug, formatDate } from '@/lib/utils';
import BlocksRenderer from '@/components/BlocksRenderer';

export async function generateStaticParams() {
  let posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }

  let { title, publishedAt, summary } = post.metadata;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  let post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-medium text-2xl mb-2 tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-1 md:mt-2 mb-4 md:mb-6 lg:mb-8">
        <p className="text-neutral-600 dark:text-neutral-400" style={{ fontSize: '16px' }}>
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <BlocksRenderer content={post.content} />
      </article>
    </section>
  );
} 