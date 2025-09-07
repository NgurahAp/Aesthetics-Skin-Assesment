"use client";

import React from "react";
import { Clock, User } from "lucide-react";
import { Article } from "@/types/dashboard";
import { useArticles } from "@/hooks/dashboard-hook";
import Loading from "@/components/ui/Loading";

const ArticlesPage: React.FC = () => {
  const { data, isLoading, error, isError } = useArticles();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">
            {error?.message || "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  console.log("Dashboard Data:", data);

  return (
    <div>Article Page</div>
    // <div className="py-16 px-4 bg-gradient-to-b from-white to-[#fefcf7]">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="text-center mb-12">
    //       <h2 className="text-4xl font-bold mb-4 text-[#2d4a2d]">
    //         Expert Skincare Articles
    //       </h2>
    //       <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#4c6a4c]">
    //         Dive deep into the science of skincare with our comprehensive
    //         guides, tips, and expert insights from dermatologists and beauty
    //         professionals.
    //       </p>
    //     </div>

    //     {articles.length > 0 ? (
    //       <div className="grid md:grid-cols-3 gap-8">
    //         {articles.map((article) => (
    //           <div
    //             key={article.id}
    //             className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#f5f0e3]"
    //           >
    //             <div className="relative h-64 overflow-hidden">
    //               <img
    //                 src={article.thumbnail}
    //                 alt={article.title}
    //                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    //                 onError={(e) => {
    //                   // Fallback image if thumbnail fails to load
    //                   e.currentTarget.src =
    //                     "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=250&fit=crop&crop=center";
    //                 }}
    //               />
    //               <div className="absolute top-4 left-4">
    //                 <span className="bg-white/90 backdrop-blur-sm text-[#3a523a] px-3 py-1 rounded-full text-xs font-medium">
    //                   {article.category}
    //                 </span>
    //               </div>
    //             </div>

    //             <div className="p-6">
    //               <h3 className="text-xl font-bold text-[#2d4a2d] mb-3 leading-tight line-clamp-1">
    //                 {article.title}
    //               </h3>

    //               <p className="text-[#4c6a4c] text-sm mb-4 leading-relaxed line-clamp-2">
    //                 {article.content}
    //               </p>

    //               <div className="flex items-center justify-between text-xs text-[#6a9669] mb-6">
    //                 <div className="flex items-center gap-1">
    //                   <User className="w-3 h-3" />
    //                   <span>{article.author}</span>
    //                 </div>
    //               </div>

    //               <button
    //                 className="w-full bg-[#4c6a4c] hover:bg-[#3a523a] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md"
    //                 onClick={() => {
    //                   // Add your navigation logic here
    //                   console.log(`Navigate to article: ${article.id}`);
    //                 }}
    //               >
    //                 Read Article
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       // Empty state
    //       <div className="text-center py-12">
    //         <div className="bg-[#faf6ed] rounded-2xl p-8 max-w-md mx-auto">
    //           <h3 className="text-lg font-semibold text-[#2d4a2d] mb-2">
    //             No Articles Available
    //           </h3>
    //           <p className="text-[#4c6a4c] text-sm">
    //             We're working on bringing you amazing skincare content. Check
    //             back soon!
    //           </p>
    //         </div>
    //       </div>
    //     )}

    //     {/* View All Button */}
    //     {articles.length > 0 && (
    //       <div className="text-center mt-12">
    //         <button
    //           className="bg-[#e1e8e1] hover:bg-[#c3d4c3] text-[#3a523a] px-8 py-3 rounded-xl font-medium transition-colors border border-[#a5c0a5] hover:border-[#87ac87]"
    //           onClick={() => {
    //             // Add navigation to all articles page
    //             console.log("Navigate to all articles page");
    //           }}
    //         >
    //           View All Articles
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default ArticlesPage;
