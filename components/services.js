var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
 url: '/services',
 template: render().outerHTML,
 controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', component],
 params: {
   service: null
 }
}

function component ($scope, $state, store, contentful,  $uibModal, $window) {
  contentful.entries('content_type=serviceTypes').then(function(res) {
    var seoData = res.data.items[0];
    if (seoData.fields.pageTitleSeo) {
      document.title = seoData.fields.pageTitleSeo;
    }
    if (seoData.fields.pageSpecificMetaDescriptionSeo) {
      var meta = document.getElementsByTagName("meta");
      for (var i = 0; i < meta.length; i++) {
        if (meta[i].name.toLowerCase() === "description") {
          meta[i].content = seoData.fields.pageSpecificMetaDescriptionSeo;
        }
      }
    }
  });

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
    $scope.email = $scope.currentService.fields.contactPerson
  } else if (store.get('selectedService')){
    $scope.currentService = store.get('selectedService')
    $scope.page = $scope.currentService.fields.pageTitle
    $scope.email = $scope.currentService.fields.contactPerson
  }
  $window.scrollTo(0,0);
}

function render () {
  return h('div#servicesPage', [
    h("title", {
      "attributes": {
        "ng-bind": "PageTitle.title()"
      }
    },"Serivces Page"),
    h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide'
      }),
      h("div", {
        'data-ng-if': 'currentService.fields.pageTitle === "Architecture"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-Architecture-Header2.d-bloc", {
          'style':'max-height:100vh;'},[
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
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}", {
                  'style':'text-transform:uppercase'
                })
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if': 'currentService.fields.pageTitle === "Forensic Consulting"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-ForensicConsulting.d-bloc", {
          'style':'max-height:100vh;'},[
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
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}", {
                  'style':'text-transform:uppercase'
                })
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if': 'currentService.fields.pageTitle === "Engineering"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-Engineering.d-bloc", {
          'style':'max-height:100vh;'},[
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
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}", {
                  'style':'text-transform:uppercase'
                })
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if': 'currentService.fields.pageTitle === "Life Safety & Human Factors"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-LifeSafety.d-bloc", {
          'style':'max-height:100vh;'},[
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
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}", {
                  'style':'text-transform:uppercase'
                })
              ])
            ])
          //])
        ])
      ]),
      h("div", {
        'data-ng-if': 'currentService.fields.pageTitle === "Building Enclosure"'
      },[
        h("div#bloc-1.bloc.bgc-white.bg-ABS-Headers-BuildingEnclosure.d-bloc", {
          'style':'max-height:100vh;'},[
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
                h("h4.mg-md.text-center.tc-white", "SERVICES:"),
                h("h1.mg-md.text-center.tc-white", "{{currentService.fields.pageTitle}}",{
                  'style':'text-transform:uppercase'
                })
              ])
            ])
          //])
        ])
      ]),

      h("div.closeNav", [
        h("div#bloc-2.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
          "style": "background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05)"
        }, [
          h("div.container.bloc-lg", [
            h("div.hexagon.row", [
              h("div.col-md-4.col-cd-offset-1.col-xs-12.serv", [
                h("div#over", [
                  h("span.Centerer"),
                  h("img.hxImg.Centered", {
                    "style":"margin-top:-70px;",
                    "src":"img/doubleHoney.png"
                  }),
                  h("div.gallery-text.serv", {
                    'style':'margin-top:95px;'

                  },[
                    h('img.cIcon',{'src':'img/contact_icon.png'}),
                    h("h4.hextitle", [
                      "INTERESTED IN",
                      h("br"),
                      "WORKING TOGETHER?"
                    ]),
                    h("h5.hexname.tk-aaux-next", "{{currentService.fields.contactPerson.fields.name}} {{currentService.fields.contactPerson.fields.lastName}},"),
                    h("p", "{{currentService.fields.contactPerson.fields.certificationsAndLicenses}}"),
                    // h("p", {
                    //   "style":"margin-bottom:5px"
                    // }, "Registered Architect"),
                    h("a.tk-aaux-next", {
                      'data-ng-href': 'mailto:{{currentService.fields.contactPerson.fields.emailAddress}}',
                      'style':'text-transform:uppercase'
                    },"EMAIL {{currentService.fields.contactPerson.fields.name}}")
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
