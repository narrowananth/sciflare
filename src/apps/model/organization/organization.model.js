const mongoose = require("mongoose")

const schemaOptions = {
	toObject: {
		virtuals: true,
		getters: true
	},
	toJSON: {
		virtuals: true,
		getters: true
	},
	timestamps: true
}

const organizationSchema = new mongoose.Schema(
	{
		orgName: { type: String, required: true },
		orgId: { type: String, required: true },
		orgEmail: { type: String, required: true, unique: true },
		orgPassword: { type: String, required: true },
		created_at: Date,
		updated_at: Date
	},
	schemaOptions
)

const Organization = mongoose.model("organization", organizationSchema)

module.exports = { Organization }
