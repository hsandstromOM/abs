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

function template () {
   return h('div', [
    h("a.bloc-button.btn.btn-d.scrollToTop", {
       "ng-click":"scrollToTarget()"
     }, [
       h("span.fa.fa-chevron-up")
    ]),
   /* ScrollToTop Button END*/
   /* Bloc Group */
    h("div.bloc-group", [
     /* Footer - bloc-16 */
       h("div#bloc-16.bloc.bloc-tile-3.bgc-white.l-bloc", [
         h("div.container.bloc-md", [
           h("div.row", [
             h("div.col-sm-12", [
               h("h6.mg-md", {
               'data-ui-sref': 'contact',
               'style':'cursor:pointer'
              },
                 "APPLIED BUILDING SCIENCES, INC. | CONTACT US"),
               h("div.row", {
                 "style":"padding-top:20px"
               },[
                 h("div.col-sm-3", [
                   h("h6.mg-md", {'data-ui-sref':'home', 'style':'cursor:pointer'},"HOME")
                 ]),
                 h("div.col-sm-3", [
                   h("h6.mg-md", {'data-ui-sref':'team', 'style':'cursor:pointer'},"TEAM")
                ]),
                h("div.col-sm-3", [
                   h("h6.mg-md", {'data-ui-sref':'work', 'style':'cursor:pointer'},"WORK"),
                   h("h5.mg-md.tk-aaux-next", {
                     'data-ui-sref':'work({service: serviceProvided})',
                     'data-ng-repeat': 'serviceProvided in allWorkServicesProvided',
                     'style':'cursor:pointer'},
                     '{{serviceProvided.fields.pageTitle}}')
                 ]),
                 h("div.col-sm-3", [
                   h("h6.mg-md", {'data-ui-sref':'services', 'style':'cursor:pointer'},"SERVICES"),
                    h("h5.mg-md.tk-aaux-next", {
                      'data-ui-sref':'services({service: service})',
                      'data-ng-repeat': 'service in allServices',
                      'style':'cursor:pointer'},
                      "{{service.fields.pageTitle}}"),
                 ])
               ])
             ])
           ])
         ])
       ]),
     /* Footer - bloc-16 END */
     /* Footer - bloc-17 */
       h("div#bloc-17.bloc.l-bloc.bgc-white.bloc-tile-3", [
         h("div.container.bloc-md", [
           h("div.row", [
             h("div.col-sm-12")
           ])
         ])
       ]),
     /* Footer - bloc-17 END */
     /* Footer - bloc-18 */
       h("div#bloc-18.bloc.bloc-tile-3.bgc-white.l-bloc", [
         h("div.container.bloc-md", [
           h("div.row", [
            h("div.col-sm-12", [
              h("img", {
                 "src":"img/ABS_footer_logo.png"
               })
             ])
           ])
         ])
       ])
     /* Footer - bloc-18 END */
     ])
   ])
 }
 //}
