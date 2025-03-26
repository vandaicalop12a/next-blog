import Link from 'next/link';
import ParallaxText from '../components/animations/ParallaxText';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <section className="flex flex-col gap-8">
        <ParallaxText as="h1" className="text-3xl md:text-4xl font-bold">
          Chào mừng đến với Blog Cá Nhân của tôi
        </ParallaxText>
        
        <div className="fade-in-element prose text-neutral-800 dark:text-neutral-300">
          <p>
            Đây là nơi tôi chia sẻ những suy nghĩ, quan điểm và kiến thức về lập trình,
            công nghệ và nhiều chủ đề thú vị khác. Xin hãy khám phá các bài viết của tôi!
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <ParallaxText as="h2" className="section-title text-2xl font-semibold">
          Bài viết gần đây
        </ParallaxText>
        
        <div className="section-content grid gap-6">
          <Link 
            href="/blog/bai-viet-1" 
            className="group flex flex-col p-5 -mx-5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition-all duration-200"
          >
            <div className="stagger-list">
              <h3 className="stagger-item text-xl font-medium mb-2 group-hover:text-purple-500 transition-colors">
                Bài viết mẫu 1
              </h3>
              <p className="stagger-item text-neutral-700 dark:text-neutral-400 mb-3">
                Đây là mô tả cho bài viết mẫu đầu tiên. Hãy nhấn vào để đọc thêm.
              </p>
              <div className="stagger-item flex items-center text-sm text-purple-500">
                <span>Xem bài viết </span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-4">
          <Link 
            href="/blog" 
            className="text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            Xem tất cả bài viết →
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <ParallaxText 
          as="h2" 
          className="section-title text-2xl font-semibold"
          direction="down"
        >
          Về tôi
        </ParallaxText>
        
        <div className="section-content prose text-neutral-800 dark:text-neutral-300">
          <p>
            Tôi là một nhà phát triển đam mê công nghệ web và thiết kế UX/UI. Blog này được xây dựng bằng Next.js,
            và được trang trí với hiệu ứng animation sử dụng GSAP.
          </p>
          <p>
            Hãy khám phá các bài viết của tôi hoặc liên hệ với tôi nếu bạn muốn thảo luận về các dự án hợp tác!
          </p>
        </div>
      </section>
    </div>
  );
}
