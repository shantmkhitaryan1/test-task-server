const DonateService = require("../services/DonateService");

class DonateController {
  constructor() {
    this.donateService = new DonateService();
  }

  async donateToCompaign(req, res) {
    const data = await this.donateService.donate(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = DonateController;
