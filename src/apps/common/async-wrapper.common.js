const asyncWrapper = promise => {
	return new Promise(resolve => {
		promise.then(data => resolve([null, data])).catch(err => resolve([err]))
	})
}

module.exports = { asyncWrapper }
