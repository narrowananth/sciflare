const express = require("express")
const { validateRequest } = require("../../common/joi-schema.common")
const {
	FetchOrgDetails,
	CreateOrgDetail,
	BulkCreateOrgDetails,
	UpdateOrgDetail,
	PruneOrgDetail
} = require("../../controller/organization/organization.controller")
const {
	orgFetchingSchema,
	orgRegistrationSchema,
	orgBulkRegSchema,
	orgUpdatingSchema,
	orgPruneSchema
} = require("../../utils/organization/organization.validation")

const organizationRouter = express.Router()

organizationRouter.get("/fetch", validateRequest(orgFetchingSchema), FetchOrgDetails)

organizationRouter.post("/create", validateRequest(orgRegistrationSchema), CreateOrgDetail)

organizationRouter.post("/bulk-create", validateRequest(orgBulkRegSchema), BulkCreateOrgDetails)

organizationRouter.put("/update", validateRequest(orgUpdatingSchema), UpdateOrgDetail)

organizationRouter.delete("/prune", validateRequest(orgPruneSchema), PruneOrgDetail)

module.exports = { organizationRouter }
