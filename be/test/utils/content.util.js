// test/utils/content.util.js
import { prismaClient } from "../../src/application/database.js";

export const createTestArticle = async ({
  title = "Test Article",
  content = "This is test article content",
  thumbnail = "https://example.com/thumbnail.jpg"
} = {}) => {
  return prismaClient.article.create({
    data: {
      title: title,
      content: content,
      thumbnail: thumbnail,
    },
  });
};

export const createTestVideo = async ({
  title = "Test Video",
  url = "https://example.com/video.mp4",
  description = "This is test video description"
} = {}) => {
  return prismaClient.video.create({
    data: {
      title: title,
      url: url,
      description: description,
    },
  });
};

export const createTestUserContentAccess = async ({
  userId,
  contentType,
  contentId,
  articleId = null,
  videoId = null
}) => {
  return prismaClient.userContentAccess.create({
    data: {
      user_id: userId,
      content_type: contentType,
      content_id: contentId,
      article_id: articleId,
      video_id: videoId,
    },
  });
};

export const createMultipleTestArticles = async (count = 5) => {
  const articles = [];
  for (let i = 1; i <= count; i++) {
    const article = await createTestArticle({
      title: `Test Article ${i}`,
      content: `Content for test article ${i}`,
      thumbnail: `https://example.com/thumbnail${i}.jpg`
    });
    articles.push(article);
  }
  return articles;
};

export const createMultipleTestVideos = async (count = 5) => {
  const videos = [];
  for (let i = 1; i <= count; i++) {
    const video = await createTestVideo({
      title: `Test Video ${i}`,
      url: `https://example.com/video${i}.mp4`,
      description: `Description for test video ${i}`
    });
    videos.push(video);
  }
  return videos;
};

export const deleteTestArticles = async () => {
  return prismaClient.article.deleteMany({
    where: {
      title: {
        startsWith: "Test Article",
      },
    },
  });
};

export const deleteTestVideos = async () => {
  return prismaClient.video.deleteMany({
    where: {
      title: {
        startsWith: "Test Video",
      },
    },
  });
};

export const deleteTestUserContentAccess = async () => {
  return prismaClient.userContentAccess.deleteMany({
    where: {
      user: {
        email: {
          endsWith: "@test.com",
        },
      },
    },
  });
};