/**
 * Lấy tất cả bài viết blog từ Strapi API
 */
export async function getBlogPosts() {
  try {
    const res = await fetch('http://localhost:1337/api/posts?populate=tags', {
      next: { revalidate: 60 } // Revalidate lại dữ liệu sau mỗi 60 giây
    });
    
    if (!res.ok) {
      throw new Error('Lỗi khi tải dữ liệu từ API');
    }
    
    const data = await res.json();
    
    return data.data.map(post => ({
      slug: post.slug,
      metadata: {
        title: post.title,
        publishedAt: post.publishedAt,
        tags: post.tags?.map(tag => tag.name) || []
      },
      content: post.content
    }));
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', error);
    return [];
  }
}

/**
 * Lấy chi tiết một bài viết từ Strapi API
 */
export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`http://localhost:1337/api/posts/${slug}?populate[tags]=*`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Không tìm thấy bài viết với slug: ${slug}`);
    }
    
    const { data } = await res.json();
    
    return {
      slug: data.slug,
      metadata: {
        title: data.title,
        publishedAt: data.publishedAt,
        tags: data.tags?.map(tag => tag.name) || []
      },
      content: data.content
    };
  } catch (error) {
    console.error(`Lỗi khi lấy bài viết ${slug}:`, error);
    return null;
  }
}

/**
 * Định dạng ngày tháng
 */
export function formatDate(date, includeRelative = false) {
  if (!date) return '';

  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
} 