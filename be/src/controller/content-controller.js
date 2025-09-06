import { logger } from "../application/logging.js";
import contentService from "../service/content-service.js";

const getArticleDetail = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const result = await contentService.getArticleDetail(articleId, req.user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    logger.error("Get detail content failed", {
      articleId: req.params.articleId,
      error: e.message,
    });
    next(e);
  }
};

const getVideoDetail = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const result = await contentService.getVideoDetail(videoId, req.user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    logger.error("Get detail video failed", {
      videoId: req.params.videoId,
      error: e.message,
    });
    next(e);
  }
};

export default {
  getArticleDetail,
  getVideoDetail,
};
