'use client';

import { useQuery } from '@tanstack/react-query';
import { posts } from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function PostPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => posts.getOne(params.id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 py-8">
        Post not found
      </div>
    );
  }

  const canEdit = user?.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span>By {post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        {canEdit && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Edit Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 