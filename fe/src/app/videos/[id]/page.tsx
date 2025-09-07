// app/videos/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { User, Clock, Play } from "lucide-react";

// Dummy data untuk contoh
const dummyVideo = {
  id: "1",
  title: "Morning Skincare Routine for Healthy Skin",
  description: `
    Start your day with the perfect skincare routine. 
    In this video, we’ll cover the essential steps, 
    from cleansing to moisturizing, and explain the 
    science behind each step.
  `,
  thumbnail:
    "https://images.unsplash.com/photo-1612817159949-d0f4a1d8a1d7?w=1200&h=600&fit=crop&crop=center",
  category: "Tutorial",
  author: "Dr. John Smith",
  createdAt: "2025-09-07",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

export default function VideoDetailPage() {
  const params = useParams();
  const { id } = params; // param id dari URL

  // untuk saat ini abaikan id, langsung pake dummyVideo
  const video = dummyVideo;

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#fefcf7] to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Thumbnail dengan play overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-96 object-cover"
          />
          <button
            onClick={() => window.open(video.url, "_blank")}
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
            {video.category}
          </span>
          <h1 className="text-4xl font-bold text-[#2d4a2d] mt-4 leading-snug">
            {video.title}
          </h1>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-[#6a9669] mb-10">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{video.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none text-[#4c6a4c] leading-relaxed">
          {video.description.split("\n").map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
