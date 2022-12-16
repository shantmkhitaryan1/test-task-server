const FraudService = require("../services/FraudService");

class FraudController {
  constructor() {
    this.fraudService = new FraudService();
  }

  async markAsFraud(req, res) {
    const data = await this.fraudService.markCampaignAsFraud(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = FraudController;
