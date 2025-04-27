'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { posts } from '@/lib/api';
import { Post } from '@/types';

export default function HomePage() {
  const { data: blogPosts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: posts.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading blog posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h1>
        <Link
          href="/posts/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts?.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/posts/${post.id}`} className="hover:text-indigo-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {post.author.name}</span>
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>

      {blogPosts?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No blog posts found. Be the first to create one!
        </div>
      )}
    </div>
  );
}
