const { Router } = require("express");
const router = Router();

const DonateController = require("../controllers/DonateController");
const donateController = new DonateController();

router.post("/", donateController.donateToCompaign.bind(donateController));

module.exports = router;
