const { HttpStatusCode } = require("axios")
const { asyncWrapper } = require("../../common/async-wrapper.common")
const {
	SearchOrg,
	FetchExistingOrg,
	CreateNewOrg,
	BulkCreateOrg,
	UpdateOrgDetails,
	PruneOrg
} = require("../../utils/organization/organization.utils")

const FetchOrgDetails = async (req, res) => {
	const { orgEmail, orgPassword } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchOrg(orgEmail, orgPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Fetching Error",
			Error: fetchErr
		})

	return res.status(HttpStatusCode.Ok).json({ message: "Welcome To The Organization" })
}

const CreateOrgDetail = async (req, res) => {
	const { orgEmail } = req.body

	const [fetchErr, getExistingOrg] = await asyncWrapper(FetchExistingOrg(orgEmail))

	if (fetchErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Fetching Error",
			Error: fetchErr
		})

	if (getExistingOrg.length > 0)
		return res.status(HttpStatusCode.Conflict).json({
			message: "Organization Already Exist"
		})

	const [orgCreateErr] = await asyncWrapper(CreateNewOrg(req.body))

	if (orgCreateErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Creation Error",
			Error: orgCreateErr
		})

	return res
		.status(HttpStatusCode.Created)
		.json({ message: "Your Organization Registered Successfully" })
}

const BulkCreateOrgDetails = async (req, res) => {
	const { count } = req.query

	const [fetchErr] = await asyncWrapper(BulkCreateOrg(count))

	if (fetchErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Bulk Registration Error",
			Error: fetchErr
		})

	return res
		.status(HttpStatusCode.Created)
		.json({ message: "Your Organization Bulk Registration Successfully" })
}

const UpdateOrgDetail = async (req, res) => {
	const { orgEmail, orgOldPassword, orgNewPassword } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchOrg(orgEmail, orgOldPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Fetching Error",
			Error: fetchErr
		})

	const [orgUpdateErr, orgUpdateRes] = await asyncWrapper(
		UpdateOrgDetails(orgEmail, orgNewPassword)
	)

	if (orgUpdateErr || !orgUpdateRes)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Password Updation Error",
			Error: orgUpdateErr
		})

	return res
		.status(HttpStatusCode.Ok)
		.json({ message: "Organization Password Update Successfully" })
}

const PruneOrgDetail = async (req, res) => {
	const { orgEmail, orgPassword } = req.body

	const [fetchErr, fetchData] = await asyncWrapper(SearchOrg(orgEmail, orgPassword))

	if (fetchErr || !fetchData)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Fetching Error",
			Error: fetchErr
		})

	const [pruneErr] = await asyncWrapper(PruneOrg(orgEmail))

	if (pruneErr)
		return res.status(HttpStatusCode.InternalServerError).json({
			message: "Organization Prune Exception",
			Error: pruneErr
		})

	return res.status(HttpStatusCode.Ok).json({ message: "Organization Successfully Pruned" })
}

module.exports = {
	FetchOrgDetails,
	CreateOrgDetail,
	BulkCreateOrgDetails,
	UpdateOrgDetail,
	PruneOrgDetail
}
