const CronJob = require('cron').CronJob;
const { compaigns: compaignModel } = require("../models/index");
const status = require('./status');

const job = new CronJob(
	'*/10 * * * * *',
	async function () {
		
		const compaigns = await compaignModel.findAll({
			where: {
				status: status.active
			}
		});
		
		const now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

		compaigns.forEach(async (e) => {
			if (e.dataValues.expiresIn < now) {
				await compaignModel.update({status: status.expired},{
					where: {
						id: e.dataValues.id
					}
				})
				
			}
		})
	},
		null,
		true		
);

module.exports = job;