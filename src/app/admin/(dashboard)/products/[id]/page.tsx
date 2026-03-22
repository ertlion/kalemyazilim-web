"use client";

import { useState, useEffect, use } from "react";
import ProductForm from "@/components/admin/ProductForm";

interface ProductData {
  id: string;
  slug: string;
  icon: string | null;
  coverImage: string | null;
  category: string;
  sortOrder: number;
  published: boolean;
  translations: {
    locale: string;
    title: string;
    shortDescription: string;
    description: string;
    features: string;
    metaTitle: string;
    metaDescription: string;
  }[];
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  }

  if (!product) {
    return <div className="text-center py-12 text-gray-500">Ürün bulunamadı</div>;
  }

  return (
    <ProductForm
      initialData={{
        id: product.id,
        slug: product.slug,
        icon: product.icon || "",
        coverImage: product.coverImage || "",
        category: product.category,
        sortOrder: product.sortOrder,
        published: product.published,
        translations: product.translations,
      }}
    />
  );
}
