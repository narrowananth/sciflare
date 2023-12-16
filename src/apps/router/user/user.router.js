const express = require("express")
const { validateRequest } = require("../../common/joi-schema.common")
const {
	FetchUserDetails,
	CreateUserDetail,
	BulkCreateUserDetails,
	UpdateUserDetail,
	PruneUserDetail
} = require("../../controller/user/user.controller")
const {
	userFetchingSchema,
	userRegistrationSchema,
	userBulkRegSchema,
	userUpdatingSchema,
	userPruneSchema
} = require("../../utils/user/user.validation")

const userRouter = express.Router()

userRouter.get("/fetch", validateRequest(userFetchingSchema), FetchUserDetails)

userRouter.post("/create", validateRequest(userRegistrationSchema), CreateUserDetail)

userRouter.post("/bulk-create", validateRequest(userBulkRegSchema), BulkCreateUserDetails)

userRouter.put("/update", validateRequest(userUpdatingSchema), UpdateUserDetail)

userRouter.delete("/prune", validateRequest(userPruneSchema), PruneUserDetail)

module.exports = { userRouter }
