import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.DEV || !data.draft;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
