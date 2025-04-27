'use client';

import { useQuery } from '@tanstack/react-query';
import { posts } from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function PostsPage() {
  const { user } = useAuth();
  const { data: postsList, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => posts.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        {user?.role === 'admin' && (
          <Link
            href="/posts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Post
          </Link>
        )}
      </div>
      <div className="space-y-6">
        {postsList?.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center text-gray-600 mt-2">
                <span>By {post.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
            </div>
          </div>
        ))}
        {postsList?.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No posts found. {user?.role === 'admin' && "Be the first to create one!"}
          </div>
        )}
      </div>
    </div>
  );
} 