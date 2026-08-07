import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

const postOgImages: Record<string, string> = {
  'laundry-room-circulight-mega-r': '/images/laundry-room-circulight/hero.svg',
};

function withPostOgImage(post: BlogPost): BlogPost {
  const ogImage = post.data.ogImage ?? postOgImages[post.id];

  if (!ogImage) {
    return post;
  }

  return {
    ...post,
    data: {
      ...post.data,
      ogImage,
    },
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.DEV || !data.draft;
  });

  return posts
    .map(withPostOgImage)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getPostUrl(post: BlogPost): string {
  return `/blog/${post.id}/`;
}

export function getIndexableTags(
  posts: BlogPost[],
  minimumPostCount = 2,
): Set<string> {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return new Set(
    [...tagCounts.entries()]
      .filter(([, count]) => count >= minimumPostCount)
      .map(([tag]) => tag),
  );
}

export function getRelatedPosts(
  currentPost: BlogPost,
  posts: BlogPost[],
  limit = 3,
): BlogPost[] {
  const normalizeTag = (tag: string) => tag.trim().toLocaleLowerCase('ja-JP');
  const currentTags = new Set(currentPost.data.tags.map(normalizeTag));
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const normalizedTag = normalizeTag(tag);
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) ?? 0) + 1);
    }
  }

  return posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const sharedTags = post.data.tags
        .map(normalizeTag)
        .filter((tag) => currentTags.has(tag));

      // 珍しいタグほど同一ゲーム名などの可能性が高いため、重く評価する。
      const tagScore = sharedTags.reduce((score, tag) => {
        return score + 1 / (tagCounts.get(tag) ?? 1);
      }, 0);
      const categoryScore =
        post.data.category === currentPost.data.category ? 0.05 : 0;

      return {
        post,
        score: tagScore + categoryScore,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
