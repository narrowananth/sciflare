const { HttpStatusCode } = require("axios")

const UserLogedin = async (req, res) => {
	return res.status(HttpStatusCode.Ok).json({ message: `Successfully Logedin` })
}

const UnauthorizedUser = async (req, res) => {
	return res.status(HttpStatusCode.BadRequest).json({ message: `Unauthorized User` })
}

const LogoutUser = async (req, res) => {
	req.logout(err => {
		if (err) return next(err)

		return res.status(HttpStatusCode.Ok).redirect("/api/v1/auth/login")
	})
}

module.exports = { UserLogedin, UnauthorizedUser, LogoutUser }
