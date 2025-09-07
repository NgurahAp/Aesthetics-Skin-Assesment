"use client";

import React, { useState } from "react";
import { Clock, User, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Video } from "@/types/dashboard";
import { useVideos } from "@/hooks/dashboard-hook";
import Loading from "@/components/ui/Loading";

const VideosPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isError, isFetching } = useVideos({ 
    page: currentPage 
  });

  if (isLoading && currentPage === 1) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">
            {error?.message || "Failed to load videos data"}
          </p>
        </div>
      </div>
    );
  }

  // Extract videos and pagination data
  const videos = data?.data?.videos || [];
  const paging = data?.data?.paging || { page: 1, total_items: 0, total_pages: 1 };

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < paging.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paging.total_pages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-[#fefcf7] to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#2d4a2d]">
            Expert Skincare Videos
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#4c6a4c]">
            Watch detailed tutorials and expert insights on skincare techniques,
            product reviews, and professional tips from certified
            dermatologists.
          </p>
        </div>

        {/* Loading overlay for pagination */}
        {isFetching && currentPage > 1 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <Loading />
            </div>
          </div>
        )}

        {videos.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {videos.map((video: Video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#f5f0e3]"
                >
                  <div className="relative h-64 overflow-hidden cursor-pointer">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback image if thumbnail fails to load
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=250&fit=crop&crop=center";
                      }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Play
                          className="w-6 h-6 text-[#4c6a4c] ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[#3a523a] px-3 py-1 rounded-full text-xs font-medium">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2d4a2d] mb-3 leading-tight line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-[#4c6a4c] text-sm mb-4 leading-relaxed line-clamp-3">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#6a9669] mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{video.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(video.created_at.toString())}</span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-[#4c6a4c] hover:bg-[#3a523a] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                      onClick={() => {
                        if (video.url) {
                          window.open(video.url, "_blank");
                        } else {
                          console.log(`Play video: ${video.id}`);
                        }
                      }}
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      Watch Video
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {paging.total_pages > 1 && (
              <div className="flex items-center justify-center mt-12 space-x-2">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isFetching}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 1 || isFetching
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#4c6a4c] hover:bg-[#f5f0e3] border border-[#e1e8e1]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={isFetching}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#4c6a4c] text-white"
                        : isFetching
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-[#4c6a4c] hover:bg-[#f5f0e3] border border-[#e1e8e1]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === paging.total_pages || isFetching}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === paging.total_pages || isFetching
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#4c6a4c] hover:bg-[#f5f0e3] border border-[#e1e8e1]"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            <div className="text-center mt-4 text-sm text-[#6a9669]">
              Showing page {paging.page} of {paging.total_pages} ({paging.total_items} total videos)
            </div>
          </>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <div className="bg-[#faf6ed] rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-[#2d4a2d] mb-2">
                No Videos Available
              </h3>
              <p className="text-[#4c6a4c] text-sm">
                We're working on bringing you amazing skincare video content.
                Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;