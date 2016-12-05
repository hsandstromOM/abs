// example factory for events
var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  return {
  	list: function () {
      var ne = newEvent('patients', 'list', {}, {})
      return $http.post('/api', ne).then(function (result) {
        return _(result.data.object.rows).pluck('doc')
      })
    },

    create: function (patient) {
      var ne = newEvent('patients', 'create', patient, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },

    update: function (patient, id) {
      var ne = newEvent('patients', 'update', patient, id)
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    },

    remove: function (patient) {
    	var ne = newEvent('patients', 'remove', patient, {})
      return $http.post('/api', ne).then(function (result) {
      	return result.data.object
      })
    }
	}
}
