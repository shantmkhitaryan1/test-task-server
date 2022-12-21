const { compaigns: compaignModel } = require("../models/index");
const { donations: donationModel } = require("../models/index");
const BaseService = require('./BaseService');
const status = require('./status');

class DonateService extends BaseService {
  constructor() {
    super();
  }

  async donate(req, res) {

    try {
      const { goalAmount, compaignId, donatorName, address } = req.body;

      if (compaignId) {
        let compaign = await compaignModel.findByPk(compaignId);

        if (!compaign || (compaign.dataValues.status !== status.active)) {
          return this.response({
            status: false,
            statusCode: 400,
            message: 'Compaign not found'
          });
        }

        if (goalAmount < 0 || typeof goalAmount !== "number") {
          return this.response({
            status: false,
            statusCode: 400,
            message: 'Enter correct number'
          })
        }

        await compaignModel.increment('amount', {
          by: goalAmount,
          where: {
            id: compaignId
          }
        });
        
        compaign = await compaignModel.findByPk(compaignId);
        
        if (compaign.amount >= compaign.goalAmount) {
          compaign.status = status.successful;
          await compaign.save()
        }

        await donationModel.create({
          compaignName: compaign.name,
          cryptoCurrencyWallet: address,
          amount: goalAmount,
          status: status.valid,
          compaign_id: compaignId,
          donatorName
        });

        return this.response({
          data: {
            compaign: {
              id: compaignId,
              name: compaign.name,
              description: compaign.description,
              amount: compaign.amount,
              expiresIn: compaign.expiresIn
            }
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Compaign ID is required'
      })
    } catch (error) {
      return this.serverErrorResponse(error);
    }

  }
}

module.exports = DonateService;