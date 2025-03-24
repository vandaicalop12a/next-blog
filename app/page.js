import { BlogPosts } from '@/components/posts';

export default function Home() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-4 md:mb-6 lg:mb-8 tracking-tighter">
        My Portfolio
      </h1>
      <p className="prose text-neutral-800 dark:text-neutral-200 mb-8 md:mb-12 lg:mb-16" style={{ fontSize: '16px' }}>
        I&apos;m a Vim enthusiast and tab advocate, finding unmatched efficiency in Vim&apos;s keystroke commands and tabs&apos; flexibility for personal viewing preferences. This extends to my support for static typing, where its early error detection ensures cleaner code, and my preference for dark mode, which eases long coding sessions by reducing eye strain.
      </p>
      <div className="mt-4">
        {/* @ts-expect-error Async Server Component */}
        <BlogPosts />
      </div>
    </section>
  );
}
