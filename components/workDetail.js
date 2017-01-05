var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
  url: '/workDetail',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', component],
  params: {
    obj: null,
    service: null
  }
}

function component ($scope, $state, store, contentful,  $uibModal, $window) {
  $scope.page = 'workDetail'
  $scope.custom = true
  $scope.custom1 = false
  $scope.custom2 = true
  $scope.slide = {
    'down' : true
  }
  if ($state.params.obj) {
    $scope.workProject = $state.params.obj
    store.set('workProject', $state.params.obj)
  } else if (store.get('workProject')) {
    $scope.workProject = store.get('workProject')
    console.log('workProject', $scope.workProject)
  } else {
    $state.go('buildingEnclosure')
  }
  contentful.entries('content_type=workProjects').then(function(res) {
    $scope.allWorkProjects = res.data.items
    console.log($scope.allWorkProjects[0])
  })
  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: volunteerModal().outerHTML,
      controller: 'ModalInstanceCtrl'
    });
  }

  if($state.params.service) {
    $scope.page = $state.params.service
    $scope.currentServiceProvided = $state.params.service
    $scope.selectedService = $state.params.service.fields.pageTitle
    store.set('workService', $scope.selectedService)
  } else if(store.get('selectedWorkService')){
    $scope.currentServiceProvided = store.get('selectedWorkService')
    $scope.selectedService = $scope.currentServiceProvided.fields.pageTitle
  }

  $scope.mainPage = 'work'
  $scope.slide = {
    'workNav' : true
  }
  $scope.selectServiceProvided = function (serviceProvided) {
    $scope.currentServiceProvided = serviceProvided
    $scope.page = $scope.currentServiceProvided
  }

//// below needed for service subnav to display///////
  $scope.allServices = []
  contentful.entries('content_type=serviceTypes&include=3').then(function(res) {
    var items = res.data.items
    angular.forEach(items, function(item){
      $scope.allServices.push(item)
    })
   })
  $scope.selectService = function (service) {
    $scope.currentService = service
    $scope.page = $scope.currentService.fields.pageTitle
  }
  $scope.allWorkProjects = []
  contentful.entries('content_type=workProjects&include=3').then(function(res) {
    $scope.allWorkProjects = res.data.items
  })
}

angular.module('app').controller('ModalInstanceCtrl', function( $scope, $uibModalInstance) {
  $scope.cancel = function (){
    $uibModalInstance.dismiss('cancel')
  }
})
function render () {
  return h('div#homePage', [
    h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide'
      }),
      h("div#bloc-1.bloc.bgc-white.bg-Header-Placeholder.d-bloc", {'style':'max-height:75vh;'},[
        h('img.honeycomb-left',{
          'src':'img/honeycomb_pattern.png',
          'style':"max-height:310px;z-index:1;margin-left:-50px !important;"
        }),
        h('img.honeycomb-right',{
          'src':'img/honeycomb.png',
          'style':"max-height:400px;z-index:1;margin-right:-50px !important;"
        }),
        //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
          h("div.row", [
            h("div.col-sm-12", {'style':'margin-top:-160px;text-transform: uppercase;'},[
              h("h4.mg-md.tc-white.text-center.ng-binding", "WORK/{{currentServiceProvided.fields.pageTitle}}:"),
              h("h1.mg-md.tc-white.text-center", "{{workProject.fields.title}}")
            ])
          ])
        //])
      ]),
      //h("div.closeNav", {
      //  'style': 'margin-top:95px;'
      //}, [
        h("div#bloc-2.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
          "style": "padding-top:95px;background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05)"
        }, [
          h("div.container.bloc-lg", [
            h("div.hexagon.row", [
              h("div.col-md-4.col-cd-offset-1.col-xs-12", [
                h("div#over", [
                  h("span.Centerer"),
                  h("img.Centered", {
                    "style":"margin-top:-185px",
                    "src":"img/doubleHoney.png"
                  }),
                  h("div.gallery-text", {
                    'style':'margin-top:-30px;'
                  },[
                    h('img',{'src':'img/contact_icon.png'}),
                    h("h4.hextitle", [
                      "INTERESTED IN",
                      h("br"),
                      "WORKING TOGETHER?"
                    ]),
                    h("h5.hexname.tk-aaux-next", "SCOTT A. HARVEY,"),
                    h("p", "AIA, RWC, LEED AP"),
                    h("p", {
                      "style":"margin-bottom:5px"
                    }, "Registered Architect"),
                    h("a.tk-aaux-next", "EMAIL SCOTT")
                  ])
                ])
              ]),
              h("div.col-md-6.col-xs-12", {
                'data-marked':'workProject.fields.description'
              }),
              h("div.container", [
                h('br'),
                h("div.col-md-12", [
                  h('br'),
                  h('br'),
                  h("div.well", {
                    "style":"background-color:none;border:none;border-radius:0;-webkit-box-shadow:none;box-shadow:none"
                  }, [
                    h("div#myCarousel.carousel.slide", [
                      h("div.carousel-inner", [
                        h("div.item.active", [
                          h("div.row", [
                            h("div.col-sm-2", {
                              "ng-repeat":"image in workProjectCtrl.fields.workProjectGallery[0] ",
                              "ng-style":"{ 'background-image' : 'url({{ image.fields.file.url }})'}",
                            }),
                            h("div.col-sm-2", [
                              h("a", {
                                "href":"#x"
                              }, [
                                h("img.img-responsive", {
                                  "src":"{{workProject.fields.thumbnailImage.fields.file.url}}",
                                  "alt":"Image"
                                })
                              ])
                            ]),

                              ])
                            ])
                          ]),
                          h("a.left.carousel-control", {
                            "style":"margin-left:-50px;background-color:grey;width:40px;background-image:none",
                            "href":"#myCarousel",
                            "data-slide":"prev"
                          }, [
                            h("i.fa.fa-2x.fa-angle-left", {
                              "style":"color:white;padding-top:70px"
                            })
                          ]),
                          h("a.right.carousel-control", {
                            "style":"margin-right:-50px;background-color:grey;width:40px;background-image:none",
                            "href":"#myCarousel",
                            "data-slide":"next"
                          }, [
                            h("i.fa.fa-2x.fa-angle-right", {
                              "style":"color:white;padding-top:70px"
                            })
                          ])
                        ])
                      ])
                    ])
                  ]),
                  h("br"),
                  h("br")
                ])
              ])
            ]),
    //  footer
    h('div', {
      'data-footermenu': ''
    }),
      //])
    ])
  ])
}
