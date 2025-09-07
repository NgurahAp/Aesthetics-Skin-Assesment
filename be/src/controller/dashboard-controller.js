import { logger } from "../application/logging.js";
import dashboardService from "../service/dashboard-service.js";

const getDashboardContent = async (req, res, next) => {
  try {
    const result = await dashboardService.getDashboardContent();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    logger.error("Get dashboard content failed", {
      userId: req.user?.id,
      error: e.message,
    });
    next(e);
  }
};

const updateMembership = async (req, res, next) => {
  try {
    const result = await dashboardService.updateMembership(req.body, req.user);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    logger.error("Get dashboard content failed", {
      userId: req.user?.id,
      error: e.message,
    });
    next(e);
  }
};

export default {
  getDashboardContent,
  updateMembership,
};
