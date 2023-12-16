const bodyParser = require("body-parser")
const express = require("express")
const flash = require("connect-flash")
const expressSession = require("express-session")
const MemoryStore = require("memorystore")(expressSession)
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { HttpStatusCode } = require("axios")
const { env } = require("./src/config/env.config")
const { MongoDbConnection } = require("./src/connection/mongodb.connection")
const { apiRouter } = require("./src/apps/router/index.router")
const { User } = require("./src/apps/model/user/user.model")

const app = express()

MongoDbConnection()

const RawBodyBuffer = (req, res, buf, encoding) => {
	if (buf && buf.length) req.rawBody = buf.toString(encoding || "utf8")
}

app.use(
	bodyParser.urlencoded({
		verify: RawBodyBuffer,
		extended: true,
		limit: "10mb"
	})
)

app.use(bodyParser.json({ verify: RawBodyBuffer, limit: "10mb" }))

app.use(
	bodyParser.raw({
		verify: RawBodyBuffer,
		type: "*/*"
	})
)

const timeoutInSeconds = env.apiTimeout

app.timeout = timeoutInSeconds * 1000

const TimeoutHandler = (req, res, next) => {
	if (!req.timedout) next()
	else res.status(HttpStatusCode.ServiceUnavailable).send("Service Unavailable - Timeout")
}

app.use(TimeoutHandler)

app.use(
	expressSession({
		cookie: { maxAge: 86400000 },
		store: new MemoryStore({
			checkPeriod: 86400000
		}),
		secret: "test",
		resave: true,
		saveUninitialized: true
	})
)

app.use(passport.initialize())

app.use(passport.session())

app.use(flash())

passport.use(
	new LocalStrategy(async (username, Password, done) => {
		const user = await User.findOne({ userName: username })

		if (!user) return done(null, false, { message: "Incorrect User Email" })

		bcrypt.compare(Password, user.userPassword, (err, result) => {
			if (err) return done(null, false, { message: "Incorrect User Password" })

			if (result) return done(null, user)
		})
	})
)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
	const user = await User.findById(userId)

	done(null, user)
})

app.use(env.apiVersion, apiRouter)

app.listen(env.serverPort, () => {
	console.log(`Express server listening on port ${env.serverPort}`)
})

app.get("/", (req, res) => {
	return res.status(HttpStatusCode.Ok).json({ message: "Server status is healthy" })
})

process.on("unhandledRejection", error => {
	const { message, stack } = error

	console.log({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	console.log({ type: "uncaughtException", err, origin })
})

module.exports = { app }
