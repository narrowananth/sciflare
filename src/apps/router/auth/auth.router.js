const express = require("express")
const passport = require("passport")
const { validateRequest } = require("../../common/joi-schema.common")
const { CreateUserDetail } = require("../../controller/user/user.controller")
const { userRegistrationSchema } = require("../../utils/user/user.validation")
const {
	UserLogedin,
	UnauthorizedUser,
	LogoutUser
} = require("../../controller/auth/auth.controller")

const authRouter = express.Router()

authRouter.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/api/v1/auth/login",
		failureRedirect: "/api/v1/auth/unauthorized",
		failureFlash: true
	})
)

authRouter.get("/login", UserLogedin)

authRouter.get("/unauthorized", UnauthorizedUser)

authRouter.get("/logout", LogoutUser)

authRouter.get("/register", validateRequest(userRegistrationSchema), CreateUserDetail)

module.exports = { authRouter }
