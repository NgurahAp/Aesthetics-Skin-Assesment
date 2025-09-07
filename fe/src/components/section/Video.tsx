import React from "react";
import { Clock, User, Play } from "lucide-react";

const ExpertVideosSection = () => {
  const videos = [
    {
      id: 1,
      title: "Complete Skincare Routine for Beginners",
      description:
        "Learn the fundamentals of skincare with this step-by-step guide perfect for those just starting their skincare journey.",
      author: "Dr. Sarah Chen",
      duration: "12:45",
      category: "Tutorials",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Ingredient Spotlight: Niacinamide Benefits",
      description:
        "Deep dive into niacinamide, its benefits for your skin, and how to properly incorporate it into your routine.",
      author: "A. Emma Rodriguez",
      duration: "8:30",
      category: "Ingredients",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Anti-Aging Skincare: What Really Works",
      description:
        "Expert analysis of anti-aging ingredients and techniques that are scientifically proven to work effectively.",
      author: "S. Michael Park",
      duration: "15:22",
      category: "Anti-Aging",
      image:
        "https://images.unsplash.com/photo-1570554886111-e80fcac6c1b6?w=400&h=250&fit=crop&crop=center",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#fefcf7] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">
            Expert Skincare Videos
          </h2>
          <p className="text-lg  max-w-3xl mx-auto leading-relaxed">
            Watch detailed tutorials and expert insights on skincare techniques, 
            product reviews, and professional tips from certified dermatologists.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#f5f0e3]"
            >
              {/* Video Thumbnail with Play Button */}
              <div className="relative h-64 overflow-hidden cursor-pointer">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-[#4c6a4c] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#3a523a] px-3 py-1 rounded-full text-xs font-medium">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2d4a2d] mb-3 leading-tight line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-[#4c6a4c] text-sm mb-4 leading-relaxed line-clamp-2">
                  {video.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-[#6a9669] mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{video.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Watch Video Button */}
                <button className="w-full bg-[#4c6a4c] hover:bg-[#3a523a] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" fill="currentColor" />
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[#e1e8e1] hover:bg-[#c3d4c3] text-[#3a523a] px-8 py-3 rounded-xl font-medium transition-colors border border-[#a5c0a5] hover:border-[#87ac87]">
            View All Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertVideosSection;