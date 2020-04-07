const connection = require("../database/connection");
const generateUniqueId = require("../utils/generateUniqueId");

module.exports = {
	async index(request, response) {
		const companies = await connection("companies").select("*");

		return response.json(companies);
	},

	async create(request, response) {
		const { name, email } = request.body;

		const id = generateUniqueId();

		await connection("companies").insert({
			id,
			name,
			email,
		});

		return response.json({ id });
	},
};
