const { Router } = require("express");
const router = Router();

const FraudController = require("../controllers/FraudController");
const fraudController = new FraudController();

router.get("/:id", fraudController.markAsFraud.bind(fraudController));

module.exports = router;
