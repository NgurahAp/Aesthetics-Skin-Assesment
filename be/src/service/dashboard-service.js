import { prismaClient } from "../application/database.js";

const getDashboardContent = async () => {
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

  return {
    success: true,
    articles: articles,
    videos: videos,
  };
};

export default {
  getDashboardContent,
};
