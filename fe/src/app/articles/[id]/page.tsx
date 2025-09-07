// app/articles/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { User, Clock } from "lucide-react";

const dummyArticle = {
  id: "1",
  title: "The Science of Hydration in Skincare",
  content: `
    Hydration plays a crucial role in maintaining healthy skin. 
    Without enough moisture, the skin barrier becomes compromised, 
    leading to dryness, irritation, and even premature aging.
    
    In this article, we’ll explore how moisturizers work, 
    the difference between humectants, emollients, and occlusives, 
    and how to choose the right hydration routine for your skin type.
  `,
  thumbnail:
    "https://images.unsplash.com/photo-1600185365483-26d7c6cb6c47?w=1200&h=600&fit=crop&crop=center",
  category: "Skincare Science",
  author: "Dr. Jane Doe",
  publishedAt: "2025-09-07",
};

export default function ArticleDetailPage() {
  const params = useParams();
  const { id } = params; // param dari URL

  // Untuk sekarang kita abaikan id, langsung pake dummyArticle
  // nanti bisa fetch API pakai id ini
  const article = dummyArticle;

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-[#fefcf7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Thumbnail */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Category + Title */}
        <div className="mb-6">
          <span className="bg-[#f5f0e3] text-[#3a523a] px-4 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold text-[#2d4a2d] mt-4 leading-snug">
            {article.title}
          </h1>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-[#6a9669] mb-10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#4c6a4c] leading-relaxed">
          {article.content.split("\n").map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
