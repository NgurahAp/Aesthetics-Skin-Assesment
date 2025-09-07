import { prismaClient } from "../application/database.js";
import { changeMembershipValidation } from "../validation/request-validation.js";
import { validate } from "../validation/validation.js";

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

const updateMembership = async (request, user) => {
  const packageValidation = validate(changeMembershipValidation, request);

  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      membership_package: packageValidation.package,
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      membership_package: true,
    },
  });
};

export default {
  getDashboardContent,
  updateMembership,
};
