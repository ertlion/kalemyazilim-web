"use client";

import { useState, useEffect, use } from "react";
import PostForm from "@/components/admin/PostForm";

interface PostData {
  id: string;
  slug: string;
  coverImage: string | null;
  published: boolean;
  translations: {
    locale: string;
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
  }[];
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  }

  if (!post) {
    return <div className="text-center py-12 text-gray-500">Yazı bulunamadı</div>;
  }

  return (
    <PostForm
      initialData={{
        id: post.id,
        slug: post.slug,
        coverImage: post.coverImage || "",
        published: post.published,
        translations: post.translations,
      }}
    />
  );
}
