import Link from 'next/link';
import { getBlogPosts, formatDate } from '@/lib/utils';
import ParallaxText from '@/components/animations/ParallaxText';
import AnimatedCard from '@/components/animations/AnimatedCard';

export const metadata = {
  title: 'Blog - Next.js Blog',
  description: 'Read our latest articles and updates on web development, technology, and more.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Debug log để xem dữ liệu thực tế
  console.log('Debug posts:', JSON.stringify(posts, null, 2));
  
  return (
    <div className="container mx-auto px-4 py-12">
      <ParallaxText as="h1" className="text-4xl font-bold mb-8 text-center">
        Blog
      </ParallaxText>
      
      {!posts || posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No posts found. Check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <AnimatedCard 
              key={post.slug || post.id}
              title={post.title || 'Untitled Post'} 
              description={post.description || 'No description available'} 
              date={post.date || ''}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
} 