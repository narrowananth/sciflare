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

const userSchema = new mongoose.Schema(
	{
		userName: { type: String, required: true },
		userId: { type: String, required: true },
		userEmail: { type: String, required: true, unique: true },
		userPassword: { type: String, required: true },
		orgId: { type: mongoose.Schema.Types.Array, ref: "Organization", required: true },
		role: { type: String, required: false },
		privilege: { type: String, required: false },
		created_at: Date,
		updated_at: Date
	},
	schemaOptions
)

const User = mongoose.model("user", userSchema)

module.exports = { User }
