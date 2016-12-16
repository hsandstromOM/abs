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
      h("a.honeyComb", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[0]'
      }, [
        h("img.overlayer", {
          "src":'img/homeGreen.png',
          'style': 'position:absolute;'
        }),
        h("img", {
          "src":"img/homeHoney.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        }, [
          h("p", {
            "style":"letter-spacing:1.5px;font-weight:bold;color:white;display:inline-block;vertical-align:middle",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ]),
    h('.homeHoneyTwo', [
      h("a.honeyComb", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[1]'
      }, [
        h("img.overlayer", {
          "src":'img/homeGreen.png',
          'style': 'position:absolute;'
        }),
        h("img", {
          "src":"img/homeHoney.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        }, [
          h("p", {
            "style":"letter-spacing:1.5px;font-weight:bold;color:white;display:inline-block;vertical-align:middle",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ]),
    h('.homeHoneyTwo', [
      h("a.honeyComb", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[2]'
      }, [
        h("img.overlayer", {
          "src":'img/homeGreen.png',
          'style': 'position:absolute;'
        }),
        h("img", {
          "src":"img/homeHoney.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        }, [
          h("p", {
            "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ]),
    h('.homeHoneyTwo', [
      h("a.honeyComb", {
        'data-ng-click': 'setSelectedService(service)',
        'data-ui-sref': 'services({service: service})',
       'data-ng-repeat': 'service in allServices[3]'
      }, [
        h("img.overlayer", {
          "src":'img/homeGreen.png',
          'style': 'position:absolute;'
        }),
        h("img", {
          "src":"img/homeHoney.png"
        }),
        h("div.hexText", {
          "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;",
        }, [
          h("p", {
            "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle",
          }, "{{service.fields.pageTitle}}")
        ])
      ])
    ])
  ])
}
