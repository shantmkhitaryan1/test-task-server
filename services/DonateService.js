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

      const cachedCompaign = this.cachingService.getValue('compaign');

      if (compaignId) {
        let compaign;
        if (cachedCompaign) {
          compaign = cachedCompaign;
        } else {
          compaign = await compaignModel.findByPk(compaignId);

          this.cachingService.setValue({ key: 'compaign', value: compaign });
        }

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

        if (compaign.amount >= compaign.goalAmount) {
          compaign.status = status.successful;
        }

        await donationModel.create({
          compaignName: compaign.name,
          cryptoCurrencyWallet: address,
          amount: goalAmount,
          donatorName
        });

        return this.response({
          data: {
            compaign: {
              id: compaign.id,
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