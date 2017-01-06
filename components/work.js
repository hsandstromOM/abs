var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
  url: '/work',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', component],
  params: {
    service: null
  }
}

function component ($scope, $state, store, contentful,  $uibModal, $window) {
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


function render () {
  return h('div#homePage', [
    h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide'
      }),
      h("div", {
        'data-ng-if':'currentServiceProvided.fields.pageTitle === "ARCHITECTURE"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-Architecture-Header2.d-bloc", {'style':'max-height:100vh;'},[
          h('img.honeycomb-left',{
            'src':'img/honeycomb_pattern.png',
            'style':"max-height:350px;z-index:1;margin-left:-50px !important;"
          }),
          h('img.honeycomb-right',{
            'src':'img/honeycomb.png',
            'style':"max-height:540px;z-index:1;margin-right:-50px !important;"
          }),
          //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
            h("div.row", [
              h("div.col-sm-12", {'style':'margin-top:-240px;'},[
                h("h4.mg-md.text-center.tc-white", "WORK:"),
                h("h1.mg-md.text-center.tc-white.ng-binding", "{{currentServiceProvided.fields.pageTitle}}")
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if':'currentServiceProvided.fields.pageTitle === "FORENSIC CONSULTING"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-ForensicConsulting.d-bloc", {'style':'max-height:100vh;'},[
          h('img.honeycomb-left',{
            'src':'img/honeycomb_pattern.png',
            'style':"max-height:350px;z-index:1;margin-left:-50px !important;"
          }),
          h('img.honeycomb-right',{
            'src':'img/honeycomb.png',
            'style':"max-height:540px;z-index:1;margin-right:-50px !important;"
          }),
          //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
            h("div.row", [
              h("div.col-sm-12", {'style':'margin-top:-240px;'},[
                h("h4.mg-md.text-center.tc-white", "WORK:"),
                h("h1.mg-md.text-center.tc-white.ng-binding", "{{currentServiceProvided.fields.pageTitle}}")
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if':'currentServiceProvided.fields.pageTitle === "BUILDING ENCLOSURE"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-BuildingEnclosure.d-bloc", {'style':'max-height:100vh;'},[
          h('img.honeycomb-left',{
            'src':'img/honeycomb_pattern.png',
            'style':"max-height:350px;z-index:1;margin-left:-50px !important;"
          }),
          h('img.honeycomb-right',{
            'src':'img/honeycomb.png',
            'style':"max-height:540px;z-index:1;margin-right:-50px !important;"
          }),
          //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
            h("div.row", [
              h("div.col-sm-12", {'style':'margin-top:-240px;'},[
                h("h4.mg-md.text-center.tc-white", "WORK:"),
                h("h1.mg-md.text-center.tc-white.ng-binding", "{{currentServiceProvided.fields.pageTitle}}")
              ])
            ])
          //])
        ])
      ]),

      h("div.closeNav", [
      h("div#bloc-12.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
        'style':'background-color:#F6F6F6;'
      }, [
        h("div.container.bloc-lg", {
          'style': 'padding-right:5%;padding-left:5%;'
        }, [
          h("div.row", {
            'data-ng-repeat': "workProject in allWorkProjects | serviceProvided: selectedService | orderBy: 'fields.priority'"
          }, [
            h("div.col-sm-4", [
              // h("img.img-responsive.center-block", {
              //   "data-ng-src":"{{workProject.fields.thumbnailImage.fields.file.url}}"
              // }),
              h("div.shadow", [
                h("div.hexContainerWork", [
                  h(".hexThumbWork",[
                    h("img", {
                      "data-ng-src": "{{workProject.fields.thumbnailImage.fields.file.url}}"
                    }),
                  ])
                ]),
              ]),
            ]),
            h("div.col-sm-8", {
              'style': 'border-bottom:1px solid #d9dedc;padding-bottom:80px;'
            }, [
              h('br'),
              h("h2.mg-md.tc-prussian-blue", [
                h("p", {
                  "style": "text-transform: uppercase;font-weight:bold"
                }, '{{workProject.fields.title}}')
              ]),
              h("p", {
                'data-marked': 'workProject.fields.workProjectSummary',
                  'style':'padding-bottom: 3px;'
              }),
              h("a.btn.btn-lg.btn-wire.wire-btn-green-ryb.btn-sq", {
                "data-ui-sref":"workDetail({obj: workProject})",
              }, "Read More")
            ])
          ])
        ])
      ]),
    //  footer
    h('div', {
      'data-footermenu': ''
    }),
      ])
    ])
  ])
}
