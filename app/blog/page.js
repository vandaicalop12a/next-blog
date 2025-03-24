import { BlogPosts } from '@/components/posts';

export const metadata = {
  title: 'Blog',
  description: 'Read the latest articles about technology, programming, and more',
};

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-4 md:mb-6 lg:mb-8 tracking-tighter">Blog</h1>
      <BlogPosts />
    </section>
  );
} 