'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { posts } from '@/lib/api';
import PostForm from '@/components/PostForm';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => posts.getOne(params.id),
  });

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/posts');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
      <PostForm mode="edit" post={post} />
    </div>
  );
} 