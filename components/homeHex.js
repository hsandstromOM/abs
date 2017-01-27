var h = require('hyperscript')

module.exports = function () {
  return {
    template: render().outerHTML,
    controller: ['$scope', 'contentful', 'store', controller]
  }
}

function controller ($scope, contentful, store) {
  $scope.allHexServicesProvided = []
  $scope.allServices = [
    [],[],[],[],[],[]
  ]
  $scope.setSelectedService = function (service) {
    store.set('selectedService', service)
  }
  contentful.entries('content_type=serviceTypes&include=3').then(function(res) {
    var allServiceTypes = res.data.items
    var index = 1
    var switchAt = 3
    var arrayVal = 0
    angular.forEach(allServiceTypes, function(service){
      console.log(service, index)
        if(switchAt === 3) {
          if(index < switchAt){
            $scope.allServices[arrayVal].push(service)
            index ++
          } else {
            $scope.allServices[arrayVal].push(service)
            switchAt = 3
            index = 1
            arrayVal ++
          }
        } else if (switchAt === 2) {
          if (index < switchAt) {
            $scope.allServices[arrayVal].push(service)
            index ++
          } else {
            $scope.allServices[arrayVal].push(service)
            switchAt = 4
            index = 1
            arrayVal ++
          }
        }
    })
  })
}

function render () {
  return h('#honeyHex', [
    h('.homeHoneyThree', [
      h("a.honeyCombHome", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
        'data-ng-repeat': 'service in allServices[1]',
        'data-ng-if': 'service.fields.pageTitle === "Building Enclosure"',
      }, [
        h("img.overlayer", {
          "src":'img/ABS-HomeHex-building-enclosure-green.png',
          'style': 'position:absolute;'
        }),
        h("img.honeyThumb", {
          "src":"img/ABS-HomeHex-building-enclosure-hover.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        },[
          h("p", {
            "style":"font-weight:bold;color:white;text-transform: uppercase",
          }, "{{service.fields.pageTitle}}")
        ])
      ]),
      h("a.honeyCombHome", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[0]',
       'data-ng-if': 'service.fields.pageTitle === "Forensic Consulting"',
      }, [
        h("img.overlayer", {
          "src":'img/ABS-HomeHex-forensic-consulting-green.png',
          'style': 'position:absolute;'
        }),
        h("img.honeyThumb", {
          "src":"img/ABS-HomeHex-forensic-consulting-hover.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        },[
          h("p", {
            "style":"font-weight:bold;color:white;text-transform: uppercase",
          }, "{{service.fields.pageTitle}}")
        ])
      ]),
      h("a.honeyCombHome", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[1]',
       'data-ng-if': 'service.fields.pageTitle === "Life Safety & Human Factors"',
      }, [
        h("img.overlayer", {
          "src":'img/ABS-HomeHex-life-safety-human-factors-green.png',
          'style': 'position:absolute;'
        }),
        h("img.honeyThumb", {
          "src":"img/ABS-HomeHex-life-safety-human-factors-hover.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        },[
          h("p", {
            "style":"font-weight:bold;color:white;text-transform: uppercase",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ]),
    h('.homeHoneyTwo', [
      h("a.honeyCombHome", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[0]',
       'data-ng-if': 'service.fields.pageTitle === "Architecture"',
      }, [
        h("img.overlayer", {
          "src":'img/ABS-HomeHex-architecture-green.png',
          'style': 'position:absolute;'
        }),
        h("img.honeyThumb", {
          "src":"img/ABS-HomeHex-architecture-hover.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        },[
          h("p", {
            "style":"font-weight:bold;color:white;text-transform: uppercase;padding-top:17px",
          }, "{{service.fields.pageTitle}}")
        ])
      ]),
      h("a.honeyCombHome", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[0]',
       'data-ng-if': 'service.fields.pageTitle === "Engineering"',
      }, [
        h("img.overlayer", {
          "src":'img/ABS-HomeHex-engineering-green.png',
          'style': 'position:absolute;'
        }),
        h("img.honeyThumb", {
          "src":"img/ABS-HomeHex-engineering-hover.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        }, [
          h("p", {
            "style":"font-weight:bold;color:white;text-transform: uppercase;padding-top:17px",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ]),
  ])
}
