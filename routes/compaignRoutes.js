const { Router } = require("express");
const router = Router();

const { requireAuth } = require("../middlwares/AuthMiddlware");

const CompaignController = require("../controllers/CompainController");
const compaignController = new CompaignController();

router.get("/", compaignController.findAllCompaigns.bind(compaignController));

router.post(
  "/",
  requireAuth,
  compaignController.createCompaign.bind(compaignController)
);

module.exports = router;
