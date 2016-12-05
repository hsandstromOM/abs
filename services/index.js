var palmetto = require('palmettoflow-nodejs')

var emailSvc = require('./emailSvc')()
module.exports = function () {
	var ee = palmetto()
	emailSvc(ee)
	return ee
}