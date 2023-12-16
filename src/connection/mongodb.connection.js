const mongoose = require("mongoose")
const { env } = require("../config/env.config")

const MongoDbConnection = () => {
	const mongoDbUrl = env.mongoDb.connectionUrl
		.replace("$$$$", env.mongoDb.username)
		.replace("****", env.mongoDb.password)

	mongoose.connect(mongoDbUrl)

	const mongodb = mongoose.connection

	mongodb.on("error", () => {
		console.log("> error occurred from the MongoDB Atlas database")
	})
	mongodb.once("open", () => {
		console.log("> successfully opened the MongoDB Atlas database")
	})
}

module.exports = { MongoDbConnection }
