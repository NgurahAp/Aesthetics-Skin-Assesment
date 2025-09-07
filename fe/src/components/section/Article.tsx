import React from "react";
import { Clock, User } from "lucide-react";

const ExpertArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: "The Science of Double Cleansing",
      description:
        "Discover why double cleansing is essential for healthy skin and how to incorporate this Korean beauty secret into your routine.",
      author: "Dr. Sarah Chen",
      readTime: "5 min read",
      category: "Cleansing",
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Natural Ingredients That Transform Your Skin",
      description:
        "Explore the power of botanical extracts and natural actives that can revolutionize your skincare routine.",
      author: "A. Emma Rodriguez",
      readTime: "7 min read",
      category: "Ingredients",
      image:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=250&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Building Your Perfect Morning Routine",
      description:
        "A step-by-step guide to creating a morning skincare routine that protects and nourishes your skin throughout the day.",
      author: "S. Michael Park",
      readTime: "6 min read",
      category: "Routines",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=250&fit=crop&crop=center",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-[#fefcf7">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Expert Skincare Articles
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Dive deep into the science of skincare with our comprehensive
            guides, tips, and expert insights from dermatologists and beauty
            professionals.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#f5f0e3]"
            >
              {/* Image with zoom effect */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#3a523a] px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2d4a2d] mb-3 leading-tight line-clamp-1">
                  {article.title}
                </h3>

                <p className="text-[#4c6a4c] text-sm mb-4 leading-relaxed line-clamp-2">
                  {article.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-[#6a9669] mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Read Article Button */}
                <button className="w-full bg-[#4c6a4c] hover:bg-[#3a523a] text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[#e1e8e1] hover:bg-[#c3d4c3] text-[#3a523a] px-8 py-3 rounded-xl font-medium transition-colors border border-[#a5c0a5] hover:border-[#87ac87]">
            View All Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertArticlesSection;
