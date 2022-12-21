const BaseService = require("./BaseService");
const { compaigns: compaignModel } = require("../models/index");
const { donations: donationModel } = require("../models/index");
const status = require("./status");

class FraudService extends BaseService {
  constructor() {
    super();
  }

  async markCampaignAsFraud(req) {
    try {
      const compaignId = req.params.id;

      const compaign = await compaignModel.findByPk(compaignId);

      if (!compaign) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Compaign not found",
        });
      }
     
      if (compaign.dataValues.status === status.fraud) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Compaign already marked as fraud",
        });
      }
      
        await compaignModel.update(
          { status: status.fraud },
          {
            where: {
              id: compaignId,
            },
          }
        );
     
      await donationModel.update(
        { status: status.invalid },
        {
          where: {
            compaign_id: compaign.dataValues.id
          }
        }
        )  
      

      return this.response({
        statusCode: 200,
        data: compaign.dataValues.name,
        message: `Success, compaign with id ${compaignId} marked as fraud`,
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }
}

module.exports = FraudService;
