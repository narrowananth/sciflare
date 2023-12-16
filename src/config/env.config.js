const dotenv = require("dotenv")

dotenv.config()

const env = {
	apiVersion: process.env.API_VERSION,
	serverPort: process.env.SERVER_PORT,
	apiTimeout: process.env.API_TIMEOUT,
	mongoDb: {
		connectionUrl: process.env.MONGODB_CONNECTION_URL,
		username: process.env.MONGODB_USERNAME,
		password: process.env.MONGODB_PASSWORD
	}
}

module.exports = { env }
