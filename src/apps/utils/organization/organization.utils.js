const speakeasy = require("speakeasy")
const bcrypt = require("bcrypt")
const { faker } = require("@faker-js/faker")
const { Organization } = require("../../model/organization/organization.model")

const SearchOrg = async (email, password) => {
	const { orgPassword = "" } = await Organization.findOne({ orgEmail: email }).lean()

	return await bcrypt.compare(password, orgPassword)
}

const FetchExistingOrg = async orgEmail => {
	return await Organization.find({ orgEmail }).lean()
}

const CreateNewOrg = async body => {
	const { orgName, orgEmail, orgPassword } = body

	const orgId = speakeasy.totp({
		secret: speakeasy.generateSecret({ length: 20 }).base32,
		digits: 10,
		algorithm: "sha1"
	})

	const newUser = new Organization({
		orgId,
		orgName,
		orgEmail,
		orgPassword: await bcrypt.hash(orgPassword, 10)
	})

	return await newUser.save()
}

const BulkCreateOrg = async count => {
	const organizations = []

	for (let i = 0; i < count; i++) {
		const orgId = speakeasy.totp({
			secret: speakeasy.generateSecret({ length: 20 }).base32,
			digits: 10,
			algorithm: "sha1"
		})

		organizations.push({
			orgId,
			orgName: faker.internet.userName(),
			orgEmail: faker.internet.email(),
			orgPassword: await bcrypt.hash(faker.internet.password(), 10)
		})
	}

	await Organization.insertMany(organizations)
}

const UpdateOrgDetails = async (email, newPassword) => {
	return await Organization.findOneAndUpdate(
		{ orgEmail: email },
		{ orgPassword: await bcrypt.hash(newPassword, 10) },
		{ new: true }
	)
}

const PruneOrg = async orgEmail => {
	return Organization.findOneAndDelete({
		orgEmail
	})
}

module.exports = {
	SearchOrg,
	FetchExistingOrg,
	CreateNewOrg,
	BulkCreateOrg,
	UpdateOrgDetails,
	PruneOrg
}
