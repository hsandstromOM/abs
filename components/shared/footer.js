var h = require('hyperscript')

module.exports = function () {
  return {
    template: template().outerHTML,
    controller: ['$scope', '$state', '$stateParams', 'contentful', 'store', controller],
    scope: {
      mainPage: '=',
      page: '=',
      slide: '='
    }
  }
}

function controller ($scope, $state, $stateParams, contentful, store) {
  $scope.allWorkServicesProvided = []
  $scope.allServices = []
  $scope.teamDropClosed = true
  $scope.workDropClosed = true
  $scope.serviceDropClosed = true
  if(store.get('selectedService')) {
    $scope.selectedService = store.get('selectedService')
  } else {
    $scope.selectedService = ''
  }
  if(store.get('selectedWorkService')) {
    $scope.selectedWorkService = store.get('selectedWorkService')
  } else {
    $scope.selectedWorkService = ''
  }
  if(store.get('selectedDivision')) {
    $scope.currentDivision = store.get('selectedDivision')
  } else {
    $scope.currentDivision = 'All'
  }
  $scope.setSelectedService = function (serviceProvided) {
    store.set('selectedService', serviceProvided)
  }
  $scope.setWorkService = function (workService) {
    store.set('selectedWorkService', workService)
  }
  $scope.setDivision = function (division) {
    store.set('selectedDivision', division)
  }
  contentful.entries('content_type=workProjects&include=3').then(function(res) {
    var workProjects = res.data.items
    $scope.allWorkProjects = res.data.items
    angular.forEach(workProjects, function(workProject){
      if(workProject.fields.services){
        var services = workProject.fields.services
        angular.forEach(services, function(service) {
          if(service.fields){
            var index = $scope.allWorkServicesProvided.indexOf(service)
            if (index < 0) {
              $scope.allWorkServicesProvided.push(service)
            }
          }
        })
        $scope.defaultWorkService = $scope.allWorkServicesProvided[0]
      }
    })
  })
  contentful.entries('content_type=serviceTypes&include=3').then(function(res) {
    var items = res.data.items
    angular.forEach(items, function(item){
      $scope.allServices.push(item)
    })
    $scope.defaultService = $scope.allServices[0]
  })
}
