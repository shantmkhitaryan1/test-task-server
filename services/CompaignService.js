const BaseService = require('./BaseService');
const { compaigns: compaignModel } = require("../models/index");
const { users } = require("../models/index");
const { verifyToken } = require("../common/token");
const status = require('./status');

class CompaignService extends BaseService {
  constructor() {
    super();
  }

  async create(req) {
    try {

      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { name, description, goalAmount, expiresIn } = req.body;

      const token =
        req?.cookies?.accessToken ||
        req?.headers?.authorization?.split(" ")[1] ||
        null;

      const user = verifyToken({
        token,
        secret: process.env.JWT_SECRET
      });

      let userId;
      if (user) {
        userId = await users.findOne({
          where: { username: user.username }
        })
      }

      const cachedCompaigns = this.cachingService.getValue('activeCompaigns');

      const unique = cachedCompaigns
        ? cachedCompaigns.some(({ name: eName }) => eName === name)
        : !!(await compaignModel.findOne({ where: { name: name } }))

      if (unique)
        return this.response({
          status: false,
          statusCode: 400,
          message: "Duplicated compaign name"
        })

      const compaign = await compaignModel.create({
        name,
        description,
        amount: 0,
        goalAmount,
        expiresIn,
        user_id: userId.dataValues.id,
        status: status.active
      });

      this.refreshCache(compaign)

      return this.response({
        statusCode: 201,
        data: compaign
      })
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async findAllActiveCompaigns() {
    try {

      const cachedCompaigns = this.cachingService.getValue('activeCompaigns');

      if (cachedCompaigns) {
        const data = cachedCompaigns.map(({ id, name, description, goalAmount, expiresIn, status }) => {
          return {
            id,
            name,
            description,
            goalAmount,
            expiresIn: new Date(expiresIn).toLocaleDateString(),
            status
          }
        })

        return this.response({
          data
        })
      }

      const activeCompaigns = await compaignModel.findAll({
        where: {
          status: status.active
        }
      });

      this.cachingService.setValue({ key: 'activeCompaigns', value: activeCompaigns });

      const data = activeCompaigns.map(({ id, name, description, goalAmount, expiresIn, status }) => {
        return {
          id,
          name,
          description,
          goalAmount,
          expiresIn: new Date(expiresIn).toLocaleDateString(),
          status
        }
      })

      return this.response({
        data
      })
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  refreshCache(newValue) {
    const cachedCompaigns = this.cachingService.getValue('activeCompaigns');

    if (cachedCompaigns)
      this.cachingService.setValue({ key: 'activeCompaigns', value: [...cachedCompaigns, newValue] });
  }
}

module.exports = CompaignService;