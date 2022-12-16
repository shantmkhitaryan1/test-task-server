const CompaignService = require("../services/CompaignService");

class CompaignController {
  constructor() {
    this.compaignService = new CompaignService();
  }

  async createCompaign(req, res) {
    const data = await this.compaignService.create(req);
    res.status(data.statusCode).json(data);
  }

  async findAllCompaigns(req, res) {
    const data = await this.compaignService.findAllActiveCompaigns();
    res.status(data.statusCode).json(data);
  }
}

module.exports = CompaignController;
