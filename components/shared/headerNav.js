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
  $scope.headerDivision = {
    'division': 'All'
  }
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
  if(store.get('currentDivision')) {
    $scope.headerDivision.current = store.get('currentDivision')
  } else {
    $scope.headerDivision.current = 'All'
  }
  $scope.setSelectedService = function (serviceProvided) {
    if(serviceProvided){
      store.set('selectedService', serviceProvided)
    } else {
      store.set('selectedService', $scope.defaultWorkService)
    }
  }
  $scope.setWorkService = function (workService) {
    if(workService){
      store.set('selectedWorkService', workService)
    } else {
      store.set('selectedWorkService', $scope.defaultWorkService)
    }
  }
  $scope.setDivision = function (division) {
    store.set('currentDivision', division)
  }
  function comparePriority(a,b) {
  if (a.fields.priority < b.fields.priority)
    return -1;
  if (a.fields.priority > b.fields.priority)
    return 1;
  return 0;
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
              $scope.allWorkServicesProvided.sort(comparePriority)
              $scope.defaultWorkService = $scope.allWorkServicesProvided[0]
              console.log($scope.defaultWorkService)
            }
          }
        })
      }
    })
  })
  contentful.entries('content_type=serviceTypes&include=3').then(function(res) {
    var items = res.data.items
    angular.forEach(items, function(item){
      $scope.allServices.push(item)
      $scope.allServices.sort(comparePriority)
    })
    $scope.defaultService = $scope.allServices[0]
    store.set('defaultService', $scope.defaultService)
  })
}

function template () {
  return h('div',{
  }, [
    h("div#bloc-0.bloc.bgc-white.l-bloc.navBig",{
    }, [
      h("div.container.bloc-sm",  [
        h("nav.navbar.navbar-default.navbar-fixed-top", {
          'data-ng-class': "slide.workNav ? 'navShadow' : 'noShadow' || slide.serviceNav ? 'navShadow' : 'noShadow' || slide.teamNav ? 'navShadow' : 'noShadow'",
          "style":"background-color:white;",
        }, [
          h("div.navbar-header", [
            h(".navbar-brand", {
              "style": "padding-left: 5vh;height: 180px",
              'data-ui-sref': 'home'
            }, [
              h("img",{
                "src":"img/ABS_logo.png","alt":"logo","width":"247",
                'style':'cursor:pointer; text-align: center;padding-top:20px; padding-bottom:20px; ',
              })
            ])
          ]),
          h("div.navbar-collapse.navbar-1.collapse.hidden-md", {
          'style':' box-shadow: 1.5px 2.598px 27px 0px rgba(0, 0, 0, 0.35)'
        }, [
            h("ul.site-navigation.nav.navbar-nav", {
              "style":"border-top:none; backround-color:none;"
            }, [
              h("li", {
                "style":"padding-right:2vh; text-align:center;"
              }, [
                h("#team.tk-industry", {
                  "style":"cursor:pointer;font-size: 18px;font-weight:normal;line-height:21px;padding-top: 15px;padding-bottom: 15px;",
                  "data-ui-sref":"team",
                  'data-ng-class': "mainPage === 'team' ? 'selectedGreen' : 'nonSelectedBlue'"
                }, "TEAM")
              ]),
              h("li", {
                "style":"padding-right:2vh; text-align:center;"
              }, [
                h("#work.tk-industry", {
                  "style": "cursor:pointer;font-size: 18px;font-weight:normal;line-height:21px;padding-top: 15px;padding-bottom: 15px;",
                  'data-ui-sref': 'work({service: defaultWorkService})',
                  'data-ng-click': 'setWorkService()',
                  'data-ng-class': "mainPage === 'work' ? 'selectedGreen' : 'nonSelectedBlue'"
                }, "WORK")
              ]),
              h("li", {
                "style":"padding-right:2vh; text-align:center;"
              }, [
                h("div#services.tk-industry", {
                  "style": "cursor: pointer; font-size: 18px;font-weight:normal;line-height: 21px; padding-top: 15px; padding-bottom: 15px;",
                  'data-ng-click': 'setSelectedService()',
                  'data-ui-sref': 'services()',
                  'data-ng-class': "mainPage === 'services' ? 'selectedGreen' : 'nonSelectedBlue'"
                }, "SERVICES"),
              ]),
              h("li", {
                'style':'padding-right: 2vh;text-align:center;padding-top: 10px; padding-bottom: 10px;'
              }, [
                h("a.tk-industry", {
                  "style":"color:white;line-height:21px;font-weight: bold; margin: auto;width:180px;text-align:center;padding-top:5px;padding-bottom:5px;",
                  "data-ui-sref":"contact",
                  'data-ng-class': "page === 'contact' ? 'greenContact' : 'blueContact'"
                }, "CONTACT"),
              ])
            ])
          ])
        ])
      ])
    ]),
    h('nav.navbar.navbar-default.navSmall', {
      'style':'z-index:20;display:none;padding-top: 10px;'
    },[
      h('div.container-fluid', [
        h('div.navbar-header', [
          h('button.navbar-toggle', {
            'data-toggle':'collapse',
            'data-target':'#toggleNav'
          }, [
            h('span.sr-only', 'Toggle Navigation'),
            h('span.icon-bar'),
            h('span.icon-bar'),
            h('span.icon-bar')
          ]),
          h(".navbar-brand", {
            'data-ui-sref': 'home'
          }, [
            h("img",{
              "src":"img/ABS_logo.png","alt":"logo","width":"247",
              'style':'cursor:pointer',
            })
          ]),
        ]),
        h('div.collapse.navbar-collapse#toggleNav', {
          'style':'height:100% !important'
        },[

          h('ul.nav.navbar-nav', {'style':'box-shadow: 1.5px 2.598px 27px 0px rgba(0, 0, 0, 0.35) inset;margin-top: -4px;height: 100vh;border-top-style: none;'},[
            h('li.dropdown', {
              'style':'text-align: center;'
            },[

              h('p', {
                "style":"cursor:pointer;font-size: 20px;line-height:5px;padding-top: 15px;padding-bottom: 15px;",
                'data-ng-class': "mainPage === 'team' ? 'active' : 'ltc-royal-blue-traditional'",
                'data-ng-click':'teamDropClosed = !teamDropClosed; workDropClosed = true; serviceDropClosed = true',
              }, 'TEAM')
            ]),
            h('ul.dropMenu', {
              'data-ng-hide':'teamDropClosed',
              'style':'background-color:#AFBAB5; margin-top:80px;padding-left: 0px;text-align:center;width:100%;'
            },[
              h('li', {
                'style':'text-align: center; color:white;  padding:10px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':'cursor:pointer;border-bottom:1px solid white; margin: auto;padding:20px;width:300px; color:white;',
                  'data-ui-sref':'team'
                },'ALL')
              ]),
              h('li', {
                'style':'text-align: center; color:white;  padding:10px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':'cursor:pointer;border-bottom:1px solid white; margin: auto; padding:20px;width:300px;color:white;',
                },[
                  h('div', {
                    'data-ui-sref':"team({division: 'Leadership'})"
                  },'LEADERSHIP')
                ])
              ]),
              h('li', {
                'style':'text-align: center; color:white;  padding:10px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':'cursor:pointer;border-bottom:1px solid white;margin: auto; padding:20px;width:300px; color:white;',
                  'data-ui-sref':"team({division: 'Architecture'})"
                },'ARCHITECTURE')
              ]),
              h('li', {
                'style':'text-align: center; color:white; padding:20px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':' color:white;cursor:pointer;',
                  'data-ui-sref':"team({division: 'Engineering'})"
                },'ENGINEERING')
              ]),
            ]),
            ////// work mobile//////
            h('li.dropdown', {
              'style':'text-align: center;'
            },[
              h('p', {
                'data-ng-click':'workDropClosed = !workDropClosed; teamDropClosed = true; serviceDropClosed = true',
                "style":"cursor:pointer;font-size: 20px;line-height:5px;padding-top: 15px;padding-bottom: 15px;",
                'data-ng-class': "mainPage === 'work' ? 'active' : 'ltc-royal-blue-traditional'"
              }, 'WORK')
            ]),
            h('ul.dropMenu', {
              'data-ng-hide':'workDropClosed',
              'style':'background-color:#AFBAB5;margin-top:160px;padding-left: 0px;text-align:center;width:100%;'
            }, [
              h('li', {
                'style':'text-align: center; color:white;  padding:10px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':'border-bottom:1px solid white;padding:20px;width:300px; color:white;',
                  'data-ng-repeat': 'serviceProvided in allWorkServicesProvided | limitTo:3',
                  'data-ui-sref': 'work({service: serviceProvided})'
              }, '{{serviceProvided.fields.pageTitle}}')
              ])
            ]),
            /////// END work mobile////
            ////// services mobile/////
            h('li.dropdown', {'style':'text-align: center;'},[
              h('p', {
                'data-ng-click':'serviceDropClosed = !serviceDropClosed; workDropClosed = true; teamDropClosed = true',
                "style":"cursor:pointer;font-size: 20px;line-height:5px;padding-top: 15px;padding-bottom: 15px;",
                'data-ng-class': "mainPage === 'services' ? 'active' : 'ltc-royal-blue-traditional'"
              }, 'SERVICES')
            ]),
            h('ul.dropMenu', {
              'data-ng-hide':'serviceDropClosed',
              'style':'background-color:#AFBAB5; margin-top:260px;padding-left: 0px;text-align:center;width:100%;'
            },[
              h('li', {
                'style':'text-align: center; color:white;  padding:10px; font-size:16px;list-style:none; width:100%;'
              }, [
                h('div', {
                  'style':'border-bottom:1px solid white; text-align:center;padding:20px;width:300px; color:white;',
                  'data-ui-sref': 'services({service: service})',
                  'data-ng-repeat': 'service in allServices',
                }, '{{service.fields.pageTitle}}')
              ])
            ]),
            /////// END services mobile//////////
            ////// CONTACT MOBILE ///////
            h("li", {'style':'margin-right: 10px;'},[
              h("a", {
                "style":"color:white;line-height:5px;font-weight:bold; margin: auto;width:140px;text-align:center;padding-top:15px;padding-bottom:15px;",
                'data-ui-sref': 'contact',
                'data-ng-class': "page === 'contact' ? 'greenContact' : 'blueContact'"
              }, "CONTACT"),
            ])
          ])
        ])
      ])
    ]),



///// work full nav
    h("div.row.subnav-navigation.subnavbar.slideNav#workNav", {
      'style': 'background-color:#c5ceca;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;',
      'data-ng-class': "slide.workNav ? 'slideNavDown' : 'slideNavUp'"
    }, [
      h("div.subnavitem.col-xs-3.col-md-3",
      {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:33.3%",
        'data-ng-repeat': 'serviceProvided in allWorkServicesProvided',
        'data-ng-click': 'setWorkService(serviceProvided)'
      }, [
        h("div", {
          'data-ui-sref': 'work({service: serviceProvided})',
          'style':'border-right:1px solid white',
          'data-ng-class': "selectedWorkService.fields.pageTitle === serviceProvided.fields.pageTitle ? 'greenNav' : 'clearNav'"
        }, "{{serviceProvided.fields.pageTitle}}") ///// work full view

      ])
    ]),

    ////////////// servcies subnav full view///////
    h("div.row.subnav-navigation.subnavbar.slideNav#serviceNav", {
      'style':'background-color:#c5ceca;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;',
      'data-ng-class': "slide.serviceNav ? 'slideNavDown' : 'slideNavUp'"
    }, [
      h("div.subnavitem.col-xs-3.col-md-3",
      {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
        'data-ng-repeat': 'service in allServices',
        'data-ng-click': 'setSelectedService(service)'
      }, [
        h("div", {
          'data-ui-sref': 'services({service: service})',
          'data-ng-class': "selectedService.fields.pageTitle === service.fields.pageTitle ? 'greenNav' : 'clearNav'"
        }, "{{service.fields.pageTitle}}") /// services full view
      ])
    ]),
    ////////////// servcies subnav full view///////

    //////// team subnav full view////////////

    h("div.row.subnav-navigation.subnavbar.slideNav#teamNav", {
      'style':'background-color:#c5ceca;overflow-x:scroll;overflow-y:hidden;white-space:nowrap;',
      'data-ng-class': "slide.teamNav ? 'slideNavDown' : 'slideNavUp'"
    }, [
      h("div.subnavitem.col-xs-3.col-md-3", {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      },[
        h("div", {
          'data-ng-click': "setDivision('Architecture')",
          'data-ui-sref': "team({division: 'Architecture'})",
          'style':'border-right:1px solid white;',
          'data-ng-class': "headerDivision.current === 'Architecture' ? 'greenNav' : 'clearNav'"
        }, "ARCHITECTURE")
      ]),
      h("div.subnavitem.col-xs-3.col-md-3", {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      }, [
        h("div", {
          'data-ng-click': "setDivision('Forensic Consulting')",
          'data-ui-sref': "team({division: 'Forensic Consulting'})",
          'style':'border-right:1px solid white;',
          'data-ng-class': "headerDivision.current === 'Forensic Consulting' ? 'greenNav' : 'clearNav'"
        }, "FORENSIC CONSULTING"),
      ]),
      h("div.subnavitem.col-xs-3.col-md-3", {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      }, [
        h("div", {
          'data-ng-click': "setDivision('Building Enclosure')",
          'data-ui-sref': "team({division: 'Building Enclosure'})",
          'style':'border-right:1px solid white;',
          'data-ng-class': "headerDivision.current === 'Building Enclosure' ? 'greenNav' : 'clearNav'"
        }, "BUILDING ENCLOSURE")
      ]),
      h("div.subnavitem.col-xs-3.col-md-3", {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      },[
        h("div", {
          'data-ng-click': "setDivision('Life Safety & Human Factors')",
          'data-ui-sref': "team({division: 'Life Safety & Human Factors'})",
          'data-ng-class': "headerDivision.current === 'Life Safety & Human Factors' ? 'greenNav' : 'clearNav'"
        }, "LIFE SAFETY & HUMAN FACTORS")
      ]),
      h("div.subnavitem.col-xs-3.col-md-3", {
        "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      }, [
        h("div", {
          'data-ng-click': "setDivision('Engineering')",
          'data-ui-sref': "team({division: 'Engineering'})",
          'data-ng-class': "headerDivision.current === 'Engineering' ? 'greenNav' : 'clearNav'"
        }, "ENGINEERING")
      ]),
      // h("div.subnavitem.col-xs-3.col-md-3", {
      //   "style":"border-left:none;border-right:1px solid white;display:inline-block !important; width:20%",
      // },[
      //   h("div", {
      //     'data-ng-click': "setDivision('Leadership')",
      //     'data-ui-sref': "team({division: 'Leadership'})",
      //     'data-ng-class': "headerDivision.current === 'Leadership' ? 'greenNav' : 'clearNav'"
      //   }, "LEADERSHIP")
      // ]),
    ])

    //////// work subnav full view////////////

  ])
}
