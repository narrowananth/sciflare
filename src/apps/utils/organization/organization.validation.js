const Joi = require("@hapi/joi")

const orgFetchingSchema = Joi.object({
	orgEmail: Joi.string().email().required(),
	orgPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

const orgRegistrationSchema = Joi.object({
	orgName: Joi.string().alphanum().min(3).max(30).required(),
	orgEmail: Joi.string().email().required(),
	orgPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

const orgBulkRegSchema = Joi.object({
	count: Joi.number().required()
})

const orgUpdatingSchema = Joi.object({
	orgEmail: Joi.string().email().required(),
	orgOldPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required(),
	orgNewPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

const orgPruneSchema = Joi.object({
	orgEmail: Joi.string().email().required(),
	orgPassword: Joi.string().pattern(new RegExp("[a-zA-Z0-9]{3,30}")).required()
})

module.exports = {
	orgFetchingSchema,
	orgRegistrationSchema,
	orgBulkRegSchema,
	orgUpdatingSchema,
	orgPruneSchema
}
