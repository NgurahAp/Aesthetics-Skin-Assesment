"use client";

import { useParams } from "next/navigation";
import { User, Clock, Play } from "lucide-react";
import { useVideoDetail } from "@/hooks/dashboard-hook";
import Loading from "@/components/ui/Loading";
import { ApiError } from "@/types/error";

export default function VideoDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const { data: video, isLoading, error, isError } = useVideoDetail(id);

  const videoData = video?.data.data;

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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Not Found</h2>
          <p className="text-gray-600">Video not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#fefcf7] to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Thumbnail dengan play overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={videoData?.thumbnail}
            alt={videoData?.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              // Fallback image if thumbnail fails to load
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=250&fit=crop&crop=center";
            }}
          />
          <button
            onClick={() => window.open(videoData?.url, "_blank")}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
          >
            <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Play
                className="w-8 h-8 text-[#4c6a4c] ml-1"
                fill="currentColor"
              />
            </div>
          </button>
        </div>

        {/* Category + Title */}
        <div className="mb-6">
          <span className="bg-[#f5f0e3] text-[#3a523a] px-4 py-1 rounded-full text-sm font-medium">
            {videoData?.category}
          </span>
          <h1 className="text-4xl font-bold text-[#2d4a2d] mt-4 leading-snug">
            {videoData?.title}
          </h1>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-[#6a9669] mb-10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{videoData?.author}</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none text-[#4c6a4c] leading-relaxed">
          {videoData?.description}
        </div>
      </div>
    </div>
  );
}
