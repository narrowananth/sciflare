const { HttpStatusCode } = require("axios")
const { asyncWrapper } = require("../../common/async-wrapper.common")
const {
	FetchExistingUser,
	CreateNewUser,
	BulkCreateUsers,
	SearchUser,
	UpdateUser,
	PruneUser
} = require("../../utils/user/user.utils")

const FetchUserDetails = async (req, res) => {
	const { userEmail, userPassword } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchUser(userEmail, userPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Fetching Error",
			Error: fetchErr
		})

	return res.status(HttpStatusCode.Ok).json({ message: `Welcome ${userEmail}` })
}

const CreateUserDetail = async (req, res) => {
	const { userEmail, orgId } = req.body

	const [fetchErr, getExistingUser] = await asyncWrapper(FetchExistingUser(userEmail, orgId))

	if (fetchErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Fetching Error",
			Error: fetchErr
		})

	if (getExistingUser.length > 0)
		return res.status(HttpStatusCode.Conflict).json({
			message: "User Already Exist"
		})

	const [userCreateErr] = await asyncWrapper(CreateNewUser(req.body))

	if (userCreateErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Creation Error",
			Error: userCreateErr
		})

	return res.status(HttpStatusCode.Created).json({ message: "Your User Registered Successfully" })
}

const BulkCreateUserDetails = async (req, res) => {
	const { count } = req.query

	const [fetchErr] = await asyncWrapper(BulkCreateUsers(count))

	if (fetchErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Bulk Registration Error",
			Error: fetchErr
		})

	return res
		.status(HttpStatusCode.Created)
		.json({ message: "Your User Bulk Registration Successfully" })
}

const UpdateUserDetail = async (req, res) => {
	const { userEmail, userPassword, role, privilege } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchUser(userEmail, userPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Fetching Error",
			Error: fetchErr
		})

	const [updateUserErr, updateUserRes] = await asyncWrapper(
		UpdateUser(userEmail, role, privilege)
	)

	if (updateUserErr || !updateUserRes)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Role & Privilege Updation Error",
			Error: updateUserErr
		})

	return res
		.status(HttpStatusCode.Ok)
		.json({ message: "User Role & Privilege Update Successfully" })
}

const PruneUserDetail = async (req, res) => {
	const { userEmail, userPassword } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchUser(userEmail, userPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Fetching Error",
			Error: fetchErr
		})

	const [pruneErr] = await asyncWrapper(PruneUser(userEmail))

	if (pruneErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "User Prune Exception",
			Error: pruneErr
		})

	return res.status(HttpStatusCode.Ok).json({ message: "User Successfully Pruned" })
}

module.exports = {
	FetchUserDetails,
	CreateUserDetail,
	BulkCreateUserDetails,
	UpdateUserDetail,
	PruneUserDetail
}
