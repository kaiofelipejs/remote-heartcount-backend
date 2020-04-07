exports.up = function (knex) {
	return knex.schema.createTable("employees", function (table) {
		table.increments();

		table.string("name").notNullable();
		table.string("month").notNullable();
		table.boolean("rotation").notNullable();

		table.string("company_id").notNullable();

		table.foreign("company_id").references("id").inTable("companies");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("employees");
};
