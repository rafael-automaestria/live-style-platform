'use server';

import { prisma } from '@live-style/database';
import { revalidatePath } from 'next/cache';

export async function getForumPosts() {
  const posts = await prisma.forumPost.findMany({
    include: {
      author: {
        select: { name: true, id: true }
      },
      _count: {
        select: { comments: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  return posts;
}

export async function getForumPostDetails(postId: string) {
  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { name: true, id: true }
      },
      comments: {
        include: {
          author: {
            select: { name: true, id: true }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  });
  return post;
}

export async function createForumComment(formData: FormData) {
  const content = formData.get('content') as string;
  const authorId = formData.get('authorId') as string;
  const postId = formData.get('postId') as string;

  if (!content || !authorId || !postId) return;

  await prisma.forumComment.create({
    data: {
      content,
      authorId,
      postId
    }
  });

  revalidatePath(`/dashboard/forum/${postId}`);
}

export async function createForumPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const authorId = formData.get('authorId') as string;

  if (!title || !content || !authorId) return;

  await prisma.forumPost.create({
    data: {
      title,
      content,
      authorId
    }
  });

  revalidatePath('/dashboard/forum');
}
