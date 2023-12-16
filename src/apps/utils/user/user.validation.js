const Joi = require("@hapi/joi")

const userFetchingSchema = Joi.object({
	userEmail: Joi.string().email().required(),
	userPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

const userRegistrationSchema = Joi.object({
	orgId: Joi.string().required(),
	userName: Joi.string().alphanum().min(3).max(30).required(),
	userEmail: Joi.string().email().required(),
	userPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

const userBulkRegSchema = Joi.object({
	count: Joi.number().required()
})

const userUpdatingSchema = Joi.object({
	userEmail: Joi.string().email().required(),
	userPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required(),
	role: Joi.string().required(),
	privilege: Joi.string()
})

const userPruneSchema = Joi.object({
	userEmail: Joi.string().email().required(),
	userPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

module.exports = {
	userFetchingSchema,
	userRegistrationSchema,
	userBulkRegSchema,
	userUpdatingSchema,
	userPruneSchema
}
