const speakeasy = require("speakeasy")
const bcrypt = require("bcrypt")
const { faker } = require("@faker-js/faker")
const { User } = require("../../model/user/user.model")
const { Organization } = require("../../model/organization/organization.model")
const { adminstration } = require("../../enum/adminstration.enum")

const FetchExistingUser = async (userEmail, orgId) => {
	return await User.find({ userEmail }).lean()
}

const SearchUser = async (email, password) => {
	const { userPassword = "" } = await User.findOne({ userEmail: email }).lean()

	return await bcrypt.compare(password, userPassword)
}

const CreateNewUser = async body => {
	const { orgId, userName, userEmail, userPassword } = body

	const userId = speakeasy.totp({
		secret: speakeasy.generateSecret({ length: 20 }).base32,
		digits: 10,
		algorithm: "sha1"
	})

	const newUser = new User({
		orgId: [orgId],
		userId,
		userName,
		userEmail,
		userPassword: await bcrypt.hash(userPassword, 10)
	})

	return await newUser.save()
}

const BulkCreateUsers = async count => {
	const users = []

	const organizations = await Organization.find()

	for (let i = 0; i < count; i++) {
		const userId = speakeasy.totp({
			secret: speakeasy.generateSecret({ length: 20 }).base32,
			digits: 10,
			algorithm: "sha1"
		})

		const tempRole =
			adminstration[Object.keys(adminstration)[Math.floor(Math.random() * count)]]

		users.push({
			userName: faker.internet.userName(),
			userId,
			userEmail: faker.internet.email(),
			userPassword: await bcrypt.hash(faker.internet.password(), 10),
			orgId: [
				organizations[Math.floor(Math.random() * organizations.length)].orgId,
				organizations[Math.floor(Math.random() * organizations.length)].orgId
			],
			role: tempRole.role,
			privilege: tempRole.privilege
		})
	}

	await User.insertMany(users)
}

const UpdateUser = async (email, role, privilege) => {
	const newPrivilege = privilege || adminstration[role].privilege

	return await User.findOneAndUpdate(
		{ userEmail: email },
		{ role, privilege: newPrivilege },
		{ new: true }
	)
}

const PruneUser = async userEmail => {
	return User.findOneAndDelete({
		userEmail
	})
}

module.exports = {
	SearchUser,
	FetchExistingUser,
	CreateNewUser,
	BulkCreateUsers,
	UpdateUser,
	PruneUser
}
