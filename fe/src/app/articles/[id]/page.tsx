"use client";

import { useParams } from "next/navigation";
import { User, Clock } from "lucide-react";
import { useArticleDetail } from "@/hooks/dashboard-hook";
import Loading from "@/components/ui/Loading";
import { ApiError } from "@/types/error";
import Link from "next/link";

export default function ArticleDetailPage() {
  const params = useParams();
  const { id } = params as { id: string }; // param dari URL

  const { data: article, isLoading, error, isError } = useArticleDetail(id);

  const articleData = article?.data.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("Error fetching article detail:", error);

    const apiError = error as ApiError;
    const errorMessage =
      apiError?.response?.data?.errors || "Failed to load article data";

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center ">
          <p className="text-lg font-bold text-[#3a523a] mb-4">
            {errorMessage}
          </p>
          <Link
            href={`/`}
            className="w-full bg-[#4c6a4c] hover:bg-[#3a523a] text-white py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Not Found</h2>
          <p className="text-gray-600">Article not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-[#fefcf7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Thumbnail */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={articleData.thumbnail}
            alt={articleData.title}
            className="w-full h-80 object-cover"
            onError={(e) => {
              // Fallback image if thumbnail fails to load
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=250&fit=crop&crop=center";
            }}
          />
        </div>

        {/* Category + Title */}
        <div className="mb-6">
          <span className="bg-[#f5f0e3] text-[#3a523a] px-4 py-1 rounded-full text-sm font-medium">
            {articleData.category}
          </span>
          <h1 className="text-4xl font-bold text-[#2d4a2d] mt-4 leading-snug">
            {articleData.title}
          </h1>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-[#6a9669] mb-10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{articleData.author}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#4c6a4c] leading-relaxed">
          {articleData.content}
        </div>
      </div>
    </div>
  );
}
