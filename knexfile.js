require("dotenv").config();

module.exports = {
	development: {
		client: "pg",
		connection: process.env.DB_URL_DEV,
		migrations: {
			directory: "./src/database/migrations",
		},
	},

	test: {
		client: "sqlite",
		connection: ":memory:",
		useNullAsDefault: true,
		migrations: {
			directory: "./src/database/migrations",
		},
	},

	production: {
		client: "pg",
		connection: process.env.DB_URL_PROD,
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
