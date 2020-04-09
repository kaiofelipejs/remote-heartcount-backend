exports.up = function (knex) {
	return knex.schema.table("employees", function (table) {
		table.string("linkedinProfile");
	});
};

exports.down = function (knex) {
	return knex.schema.table("employees", function (table) {
		table.dropColumn("linkedinProfile");
	});
};
