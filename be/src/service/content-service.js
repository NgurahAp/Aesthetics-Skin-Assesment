import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { pagingValidation } from "../validation/request-validation.js";
import { validate } from "../validation/validation.js";

const getArticles = async (query) => {
  const option = validate(pagingValidation, query);

  const skip = (option.page - 1) * option.size;

  const totalArticle = await prismaClient.article.count({});

  const articles = await prismaClient.article.findMany({
    skip: skip,
    take: option.size,
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

  return {
    success: true,
    articles: articles,
    paging: {
      page: option.page,
      total_items: totalArticle,
      total_pages: Math.ceil(totalArticle / option.size),
    },
  };
};

const getArticleDetail = async (articleId, user) => {
  const article = await prismaClient.article.findUnique({
    where: {
      id: articleId,
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
    const userPackage = user.membership_package;

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
        throw new ResponseError(
          403,
          `You have reached your article limit (${articlesAccessed}/${limit}). Upgrade to access more content.`
        );
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

  const userPackage = user.membership_package;
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

const getVideos = async (query) => {
  const option = validate(pagingValidation, query);

  const skip = (option.page - 1) * option.size;

  const totalVideos = await prismaClient.video.count({});

  const videos = await prismaClient.video.findMany({
    skip: skip,
    take: option.size,
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

  return {
    success: true,
    videos: videos,
    paging: {
      page: option.page,
      total_items: totalVideos,
      total_pages: Math.ceil(totalVideos / option.size),
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
      author: true,
      category: true,
      thumbnail: true,
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
    const userPackage = user.membership_package;

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
        throw new ResponseError(
          403,
          `You have reached your video limit (${videosAccessed}/${limit}). Upgrade to access more content.`
        );
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

  const userPackage = user.membership_package;
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
  getArticles,
  getVideos,
};
