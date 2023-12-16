const express = require("express")
const { organizationRouter } = require("./organization/organization.router")
const { userRouter } = require("./user/user.router")
const { authRouter } = require("./auth/auth.router")

const apiRouter = express.Router()

apiRouter.use("/organization", organizationRouter)

apiRouter.use("/user", userRouter)

apiRouter.use("/auth", authRouter)

module.exports = { apiRouter }
