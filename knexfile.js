require("dotenv").config();

module.exports = {
	development: {
		client: "pg",
		connection: process.env.DB_URL,
		migrations: {
			directory: "./src/database/migrations",
		},
	},

	production: {
		client: "pg",
		connection: process.env.DB_URL,
		migrations: {
			directory: "./src/database/migrations",
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};
