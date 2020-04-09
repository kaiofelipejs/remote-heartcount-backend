const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const CompanyController = require("./controllers/CompanyController");
const EmployeeController = require("./controllers/EmployeeController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post(
	"/sessions",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			id: Joi.string().required().length(8),
		}),
	}),
	SessionController.create
);

routes.get("/companies", CompanyController.index);

routes.post(
	"/companies",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
		}),
	}),
	CompanyController.create
);

routes.get(
	"/profile",
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required(),
		}).unknown(),
	}),
	ProfileController.index
);

routes.get("/employees", EmployeeController.index);

routes.post(
	"/employees",
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required(),
		}).unknown(),

		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			month: Joi.string().required(),
			linkedinProfile: Joi.string(),
			rotation: Joi.boolean().required(),
		}),
	}),
	EmployeeController.create
);

routes.delete(
	"/employees/:id",
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required(),
		}),
	}),
	EmployeeController.delete
);

module.exports = routes;
