/**
 * Fetch all blog posts from Strapi API
 */
export async function getBlogPosts() {
  try {
    const response = await fetch(
      'http://localhost:1337/api/posts?populate=tags', 
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const data = await response.json();
    
    console.log('Data:', data);
    // Format the posts data from Strapi
    const posts = data.data.map(post => {
      // Safely get the date with fallbacks
      let postDate = post.publishedAt || post.createdAt;
      
      // Ensure it's a valid date
      try {
        if (!postDate || isNaN(new Date(postDate).getTime())) {
          console.log(`Invalid date for post ${post.id}:`, postDate);
          postDate = new Date().toISOString();
        }
      } catch (error) {
        console.error(`Date error for post ${post.id}:`, error);
        postDate = new Date().toISOString();
      }
      
      const formattedPost = {
        id: post.id,
        title: post.title || 'Untitled Post',
        slug: post.slug || `post-${post.id}`,
        description: post.description || '',
        content: post.content || [],
        date: postDate,
        tags: Array.isArray(post.tags) ? post.tags.map(tag => tag.name) : []
      };
      
      console.log('Formatted post:', formattedPost);
      return formattedPost;
    });
    console.log('Posts: -----------', posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a specific blog post by slug from Strapi API
 */
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/posts/${slug}?populate[tags]=*`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      throw new Error(`Post with slug: ${slug} not found`);
    }
    
    const { data } = await response.json();
    
    if (!data) {
      console.error(`No data returned for slug: ${slug}`);
      return null;
    }
    
    // Handle invalid date
    let validDate = data.publishedAt || data.createdAt;
    if (!validDate || isNaN(new Date(validDate).getTime())) {
      console.log(`Invalid date for slug ${slug}:`, validDate);
      validDate = new Date().toISOString();
    }
    
    return {
      id: data.id,
      title: data.title || 'Untitled Post',
      slug: data.slug || `post-${data.id}`,
      description: data.description || '',
      date: validDate,
      content: data.content || [],
      tags: Array.isArray(data.tags) ? data.tags.map(tag => tag.name) : []
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

/**
 * Format date safely
 */
export function formatDate(date, includeRelative = false) {
  if (!date) {
    return 'No date';
  }

  try {
    // Cố gắng chuyển đổi sang đối tượng Date
    const targetDate = new Date(date);
    
    // Kiểm tra nếu ngày không hợp lệ
    if (isNaN(targetDate.getTime())) {
      return 'Invalid Date';
    }
    
    // Trả về ngày đã định dạng một cách đơn giản
    return targetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
} 