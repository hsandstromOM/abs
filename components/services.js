var h = require('hyperscript')
//var headerNav = require('./shared/headerNav')
//var footer = require('./shared/footer')
module.exports = {
 url: '/services',
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
    store.set('services', $scope.selectedService)
  } else if(store.get('selectedServices')){
    $scope.currentServiceProvided = store.get('selectedServices')
    $scope.selectedService = $scope.currentServiceProvided.fields.pageTitle
  }
   $scope.allServicesProvided = []
   $scope.slide = {
     'serviceNav': true
   }
   $scope.mainPage = 'services'
  if($state.params.service) {
    $scope.currentService = $state.params.service
    $scope.page = $scope.currentService.fields.pageTitle
  } else if (store.get('selectedService')){
    $scope.currentService = store.get('selectedService')
    $scope.page = $scope.currentService.fields.pageTitle
  }
}

function render () {
  return h('div#homePage', [
    h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide'
      }),
      h("div.closeNav", {
        'style': 'margin-top:95px;'
      }, [
        h("div#bloc-15.bloc.bg-Architecture-Header2.bgc-white.l-bloc", [
          h("div.container.bloc-lg", [
            h("div.row", [
              h("div.col-sm-12", [
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}")
              ])
            ])
          ])
        ]),
        h("div#bloc-2.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
          "style": "background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05)"
        }, [
          h("div.container.bloc-lg", [
            h("div.hexagon.row", [
              h("div.col-md-4.col-cd-offset-1.col-xs-12", [
                h("div#over", [
                  h("span.Centerer"),
                  h("img.hexImg.Centered", {
                    "style":"margin-top:-155px !important;",
                    "src":"img/honeycomb_shape.png"
                  }),
                  h("div.gallery-text", {
                    'style':'margin-top:-5px;'

                  },[
                    h('img.cIcon',{'src':'img/contact_icon.png'}),
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
              h('.col-md-7.col-xs-12',[
                h('p.text-left', {
                  'data-marked': 'currentService.fields.description'
                }),
                h('br'),
                h('br'),
              ])
            ])
          ])
        ])
      ])
    ]),
    // footer
    h('div', {
      'data-footermenu': ''
    }),
  ])
}
