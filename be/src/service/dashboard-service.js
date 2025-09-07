import { prismaClient } from "../application/database.js";

const getDashboardContent = async (user) => {
  const articles = await prismaClient.article.findMany({
    take: 3,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      content: true,
      thumbnail: true,
      created_at: true,
    },
  });

  const videos = await prismaClient.video.findMany({
    take: 3,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      thumbnail: true,
      url: true,
      description: true,
      created_at: true,
    },
  });

  const articlesAccessed = await prismaClient.userContentAccess.count({
    where: {
      user_id: user.id,
      content_type: "article",
    },
  });

  const videosAccessed = await prismaClient.userContentAccess.count({
    where: {
      user_id: user.id,
      content_type: "video",
    },
  });

  const membershipLimits = {
    A: { articles: 5, videos: 5 },
    B: { articles: 10, videos: 10 },
    C: { articles: "unlimited", videos: "unlimited" },
  };

  const userPackage = user.Membership_package;
  const limits = membershipLimits[userPackage];

  return {
    success: true,
    data: {
      membership_info: {
        package: userPackage,
        articles_accessed: articlesAccessed,
        articles_limit: limits.articles,
        videos_accessed: videosAccessed,
        videos_limit: limits.videos,
        is_unlimited: userPackage === "C",
      },
      user_info: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      articles: articles,
      videos: videos,
    },
  };
};

export default {
  getDashboardContent,
};
