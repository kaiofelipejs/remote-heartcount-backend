const connection = require("../database/connection");

module.exports = {
	async index(request, response) {
		const employees = await connection("employees")
			.join("companies", "companies.id", "=", "employees.company_id")
			.select(["employees.*"]);

		return response.json(employees);
	},

	async create(request, response) {
		const { name, linkedinProfile = "", month, rotation } = request.body;
		const company_id = request.headers.authorization;

		const { id } = await connection("employees").insert({
			name,
			linkedinProfile,
			month,
			rotation,
			company_id,
		});

		return response.json({
			id,
			name,
			linkedinProfile,
			month,
			rotation,
			company_id,
		});
	},

	async delete(request, response) {
		const { id } = request.params;
		const company_id = request.headers.authorization;

		const employee = await connection("employees")
			.where("id", id)
			.select("company_id")
			.first();

		if (employee.company_id !== company_id) {
			return response.status(401).json({ error: "Operation not permitted." });
		}

		await connection("employees").where("id", id).delete();

		return response.status(204).send();
	},
};
