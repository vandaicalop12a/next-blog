import Link from 'next/link';
import { formatDate, getBlogPosts } from '@/lib/utils';

export async function BlogPosts() {
  const allBlogs = await getBlogPosts();

  return (
    <div className="space-y-3 md:space-y-4">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-2 md:mb-3 lg:mb-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 p-2 rounded-lg transition-colors"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0">
              <p className="text-neutral-500 dark:text-neutral-400 min-w-[100px] md:min-w-[120px] md:mr-1 tabular-nums" style={{ fontSize: '16px' }}>
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium" style={{ fontSize: '16px' }}>
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
} 