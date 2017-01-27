var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')

module.exports = {
  url: '/',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', component]
}

function component ($scope, $state, store, contentful,  $uibModal, $window) {
  $scope.page = 'home'
  $window.scrollTo(0,0);
  var left = true
  $scope.certsLeft = []
  $scope.certsRight = []
  contentful.entries('content_type=home').then(function(res) {
    $scope.contentfulData = res.data.items[0]
    angular.forEach($scope.contentfulData.fields.certsAndLicenses, function(entry) {
      if(left === true) {
        $scope.certsLeft.push(entry)
        left = false
      } else {
        $scope.certsRight.push(entry)
        left = true
      }
    })
  })
  $scope.allServicesProvided = []
  $scope.allServiceTypes = []
  $scope.goToService = function (service) {
    console.log(service)
  }
  $scope.goToWorkProjects = function (workProjects) {
    console.log(workProjects)
  }
  $scope.allWorkProjects = []
  contentful.entries('content_type=workProjects').then(function(res) {
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
      /* bloc-0 END */
      //h("div.closeNav", [
        /* bloc-1 */
        h("div#bloc-1.bloc.bgc-white.bg-header-image4.d-bloc", {'style':'max-height:175vh;'},[
          h('img.honeycomb-left',{
            'src':'img/honeycomb_pattern.png',
            'style':"max-height:400px;z-index:1;margin-left:-50px !important;"
          }),
          h('img.honeycomb-right',{
            'src':'img/honeycomb.png',
            'style':"max-height:600px;z-index:1;margin-right:-50px !important;"
          }),
          //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
            h("div.row", [
              h("div.col-sm-12", {'style':'margin-top:-325px;'},[
                h("h1.text-center.hero-bloc-text.tc-white", [
                  "STRUCTURAL INTEGRITY,",
                  h("br"),
                  "FROM THE GROUND UP"
                ]),
                //h('br'),
                //h('br'),
                h('div.text-center', [
                  h("i.fa.fa-2x.fa-angle-down.icon-green-ryb")
                ]),
                h("h3.mg-md.text-center.tc-green-ryb.tk-industry",{
                  "style": "margin-top:0px"
                }, ["WHO WE ARE."])
              ])
            ])
          //])
        ]),
      /* bloc-1 END */
      /* bloc-2 */
      h("div#bloc-2.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
        "style": "background-color:#F6F6F6;height:80%; -webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05);height:80%;"
      }, [
        h("div.container.bloc-lg", [
          h("div.row", [
            h("div.col-sm-8.col-sm-offset-2", [
              h("p.text-left", {
                'data-marked': 'contentfulData.fields.whoWeAreContent'
              }),
              h("p.text-left", {
                'style': "font-weight: 600 !important",
                'data-marked': 'contentfulData.fields.whoWeAreContentCloser'
              }),
            ]),
            h('div.col-sm-12', {'style':'margin-left:0px! important;'}, [
              h("br"),
              h('div.text-center', [
                h("i.fa.fa-2x.fa-angle-down.icon-green-ryb")
              ]),
              h("h3.mg-md.text-center.tc-green-ryb.tk-industry",{
                "style": "margin-top:0px; margin-bottom 100px"
              }, ["WHAT WE DO."]),
              h("br"),
              h("br"),
            ])
          ])
        ])
      ]),
      h('.container', {
        'style': "background-color:#ffffff;min-width:100% !important"
      },
      [


      h('div.col-md-12', {
        "style":"z-index:2"
      },[
        h('div',{
          'style':'display:block; margin:auto; text-align:center;',
        'data-homehex': ''}),
        h("br"),
      ]),
    ]),
        h("div#bloc-5.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", {
          'style':"background-color:#F6F6F6; -webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 3px 8px 4px rgba(0,0,0,.05);z-index:1;"
        }, [
          h("div.container.bloc-lg", [
            h("div.row", [
              h("div.col-sm-12", {
              },[
                h("br"),
                h("br"),
                h("h2.mg-md.text-center.tk-industry.tc-prussian-blue", "PROJECT SPOTLIGHT"),
                h("p", {
                  'style': " margin-bottom:65px;",
                  'data-marked': 'contentfulData.fields.projectSpotlightContent'
                }),
                h(".text-center", [
                  h("a.btn.btn-lg.btn-wire.wire-btn-green-ryb.btn-sq", {
                    'style': 'cursor: pointer;',
                    //"data-ng-src": 'contentfulData.fields.projectSpotlightTitle',
                    "data-ui-sref":"workDetail({projname: 'Palms Oceanfront Hotel, Isle of Palms, SC'})"
                  }, "{{contentfulData.fields.buttonText}}")
                ])

              ])
            ])
          ])
        ]),
        /* bloc-5 END */
        /* bloc-6 */
        h("div#bloc-6.bloc.tc-white.bgc-royal-blue-traditional", [
          h("div.container.bloc-md", [
            h("div.row", [
              h("div.col-sm-4", [
                h("h2.tc-white", {
                  "style":"margin-top:0"
                }, "CERTIFICATIONS AND LICENSES")
              ]),
              h("div.col-sm-4", [
                h("p", {
                  'data-ng-repeat': 'cert in certsLeft'
                }, '{{cert}}')
              ]),
              h("div.col-sm-4", [
                h("p", {
                  'data-ng-repeat': 'cert in certsRight'
                }, '{{cert}}')
              ])
            ])
          ])
        ]),
      //footer
      h('div', {
        'data-footermenu': ''
      }),
    //  ])
    ])
  ])
}
