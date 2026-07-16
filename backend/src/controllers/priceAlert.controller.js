import {
  createOrUpdatePriceAlert as createOrUpdatePriceAlertService,
  getUserPriceAlerts as getUserPriceAlertsService,
  deletePriceAlert as deletePriceAlertService,
  checkPriceAlert as checkPriceAlertService,
} from "../services/priceAlert.service.js";

const createOrUpdatePriceAlert = async (req,res,next) => {
  try {
    const alert = await createOrUpdatePriceAlertService({
        userId: req.user.id,
        productId: req.body.productId,
        targetPrice: req.body.targetPrice,
      });

    return res.status(200).json({
      success: true,
      message: "Price alert saved successfully",
      alert,
    });
  } catch (error) {
    next(error);
  }
};

const getUserPriceAlerts = async (req,res,next) => {
  try {
    const alerts = await getUserPriceAlertsService(req.user.id);

    return res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    next(error);
  }
};

const deletePriceAlert = async (req,res,next) => {
  try {
    await deletePriceAlertService({
      userId: req.user.id,
      alertId: req.params.alertId,
    });

    return res.status(200).json({
      success: true,
      message: "Price alert deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const checkPriceAlert = async (req,res,next) => {
  try {
    const result = await checkPriceAlertService(
      req.params.alertId
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export {createOrUpdatePriceAlert, getUserPriceAlerts, deletePriceAlert, checkPriceAlert,};