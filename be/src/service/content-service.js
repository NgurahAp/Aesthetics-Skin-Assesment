import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getArticleDetail = async (articleId, user) => {
  const article = await prismaClient.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      thumbnail: true,
      created_at: true,
    },
  });

  if (!article) {
    throw new ResponseError(404, "Article not found");
  }

  const existingAccess = await prismaClient.userContentAccess.findFirst({
    where: {
      user_id: user.id,
      content_type: "article",
      content_id: articleId,
    },
  });

  // If not accessed before, check quota and create access record
  if (!existingAccess) {
    const userPackage = user.Membership_package;
    
    // Skip quota check for unlimited package
    if (userPackage !== "C") {
      const articlesAccessed = await prismaClient.userContentAccess.count({
        where: {
          user_id: user.id,
          content_type: "article",
        },
      });

      const membershipLimits = {
        A: 5,
        B: 10,
      };

      const limit = membershipLimits[userPackage];

      if (articlesAccessed >= limit) {
        throw new ResponseError(403, "QUOTA_EXCEEDED", {
          message: `You have reached your article limit (${articlesAccessed}/${limit}). Upgrade to access more content.`,
          current_usage: articlesAccessed,
          limit: limit,
          package: userPackage,
        });
      }
    }

    await prismaClient.userContentAccess.create({
      data: {
        user_id: user.id,
        content_type: "article",
        content_id: articleId,
        article_id: articleId,
      },
    });
  }

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
    data: article,
    membership_info: {
      package: userPackage,
      articles_accessed: articlesAccessed,
      articles_limit: limits.articles,
      videos_accessed: videosAccessed,
      videos_limit: limits.videos,
      is_unlimited: userPackage === "C",
    },
  };
};

const getVideoDetail = async (videoId, user) => {
  const video = await prismaClient.video.findUnique({
    where: {
      id: videoId,
    },
    select: {
      id: true,
      title: true,
      url: true,
      description: true,
      created_at: true,
    },
  });

  if (!video) {
    throw new ResponseError(404, "Video not found");
  }

  const existingAccess = await prismaClient.userContentAccess.findFirst({
    where: {
      user_id: user.id,
      content_type: "video",
      content_id: videoId,
    },
  });

  if (!existingAccess) {
    const userPackage = user.Membership_package;
    
    if (userPackage !== "C") {
      const videosAccessed = await prismaClient.userContentAccess.count({
        where: {
          user_id: user.id,
          content_type: "video",
        },
      });

      const membershipLimits = {
        A: 5,
        B: 10,
      };

      const limit = membershipLimits[userPackage];

      if (videosAccessed >= limit) {
        throw new ResponseError(403, "QUOTA_EXCEEDED", {
          message: `You have reached your video limit (${videosAccessed}/${limit}). Upgrade to access more content.`,
          current_usage: videosAccessed,
          limit: limit,
          package: userPackage,
        });
      }
    }

    await prismaClient.userContentAccess.create({
      data: {
        user_id: user.id,
        content_type: "video",
        content_id: videoId,
        video_id: videoId,
      },
    });
  }

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
    data: video,
    membership_info: {
      package: userPackage,
      articles_accessed: articlesAccessed,
      articles_limit: limits.articles,
      videos_accessed: videosAccessed,
      videos_limit: limits.videos,
      is_unlimited: userPackage === "C",
    },
  };
};

export default {
  getArticleDetail,
  getVideoDetail,
};