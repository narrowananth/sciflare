const { HttpStatusCode } = require("axios")

const validateRequest = schema => {
	return (req, res, next) => {
		const { body, query } = req

		const data = { ...body, ...query }

		const { error } = schema.validate(data)

		if (error)
			return res
				.status(HttpStatusCode.BadRequest)
				.json({ error: error?.details[0]?.message || "Joi Schema Error" })

		next()
	}
}

module.exports = { validateRequest }
