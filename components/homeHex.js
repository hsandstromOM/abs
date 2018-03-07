function controller(e, i, t, n, $scope) {
  // e.allHexServicesProvided = [],
  // e.allServices = [
  //   [],
  //   [],
  //   [],
  //   [],
  //   [],
  //   []
  // ],
  // e.setSelectedService = function(e) {
  //   t.set("selectedService", e)
  // },
  // n.entries("content_type=home").then(function(res) {
  //   console.log('contentful data',res);
  //   e.contentfulData = res.data.items[0]
  // })
  // contentful.entries('content_type=home').then(function(res) {
  // console.log('contentful data',res);
  // $scope.services = res.data.items[0];
  // });
  // i.entries("content_type=serviceTypes&include=3").then(function(i) {
  //   $scope.services
  //   var t = i.data.items,
  //     r = 1,
  //     s = 3,
  //     n = 0;
  //   angular.forEach(t, function(i) {
  //     3 === s
  //       ? r < s
  //         ? (e.allServices[n].push(i), r++)
  //         : (e.allServices[n].push(i), s = 3, r = 1, n++)
  //       : 2 === s && (
  //         r < s
  //         ? (e.allServices[n].push(i), r++)
  //         : (e.allServices[n].push(i), s = 4, r = 1, n++))
  //   })
  // })
}
function render() {
  return h("#honeyHex", [
    h(".homeHoneyThree", [
      h("a.honeyCombHome", {
        // "data-ng-click": "setSelectedService(service)",
        "href": "/services/building-enclosure"
        // "data-ng-repeat": "contentfulData.fields.services[0].fields.pageTitle",
        // "data-ng-if": 'service.fields.pageTitle === "Building Enclosure"'
      }, [
        h("img.overlayer", {
          src: "img/ABS-HomeHex-building-enclosure-green.png",
          style: "position:absolute;"
        }),
        h("img.honeyThumb", {src: "img/ABS-HomeHex-building-enclosure-hover.png"}),
        h("div.hexText", {
          style: "height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"
        }, [h("p", {
            style: "font-weight:bold;color:white;text-transform: uppercase"
          }, "{{contentfulData.fields.services[0].fields.pageTitle}}")])
      ]),
      h("a.honeyCombHome", {
        // "data-ng-click": "setSelectedService(service)",
        "href": "/services/forensic-consulting"
        // "data-ng-repeat": "service in services",
        // "data-ng-if": 'service.fields.pageTitle === "Forensic Consulting"'
      }, [
        h("img.overlayer", {
          src: "img/ABS-HomeHex-forensic-consulting-green.png",
          style: "position:absolute;"
        }),
        h("img.honeyThumb", {src: "img/ABS-HomeHex-forensic-consulting-hover.png"}),
        h("div.hexText", {
          style: "height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"
        }, [h("p", {
            style: "font-weight:bold;color:white;text-transform: uppercase"
          }, "{{contentfulData.fields.services[1].fields.pageTitle}}")])
      ]),
      h("a.honeyCombHome", {
        // "data-ng-click": "setSelectedService(service)",
        "href": "/services/life-safety-and-human-factors"
        // "data-ng-repeat": "service in services",
        // "data-ng-if": 'service.fields.pageTitle === "Life Safety & Human Factors"'
      }, [
        h("img.overlayer", {
          src: "img/ABS-HomeHex-life-safety-human-factors-green.png",
          style: "position:absolute;"
        }),
        h("img.honeyThumb", {src: "img/ABS-HomeHex-life-safety-human-factors-hover.png"}),
        h("div.hexText", {
          style: "height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"
        }, [h("p", {
            style: "font-weight:bold;color:white;text-transform: uppercase"
          }, "{{contentfulData.fields.services[2].fields.pageTitle}}")])
      ])
    ]),
    h(".homeHoneyTwo", [
      h("a.honeyCombHome", {
        // "data-ng-click": "setSelectedService(service)",
        "href": "/services/architecture"
        // "data-ng-repeat": "service in services",
        // "data-ng-if": 'service.fields.pageTitle === "Architecture"'
      }, [
        h("img.overlayer", {
          src: "img/ABS-HomeHex-architecture-green.png",
          style: "position:absolute;"
        }),
        h("img.honeyThumb", {src: "img/ABS-HomeHex-architecture-hover.png"}),
        h("div.hexText", {
          style: "height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"
        }, [h("p", {
            style: "font-weight:bold;color:white;text-transform: uppercase;padding-top:17px"
          }, "{{contentfulData.fields.services[3].fields.pageTitle}}")])
      ]),
      h("a.honeyCombHome", {
        // "data-ng-click": "setSelectedService(service)",
        "href": "/services/engineering"
        // "data-ng-repeat": "service in services",
        // "data-ng-if": 'service.fields.pageTitle === "Engineering"'
      }, [
        h("img.overlayer", {
          src: "img/ABS-HomeHex-engineering-green.png",
          style: "position:absolute;"
        }),
        h("img.honeyThumb", {src: "img/ABS-HomeHex-engineering-hover.png"}),
        h("div.hexText", {
          style: "height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px;padding-left:28px;padding-right:28px;"
        }, [h("p", {
            style: "font-weight:bold;color:white;text-transform: uppercase;padding-top:17px"
          }, "{{contentfulData.fields.services[4].fields.pageTitle}}")])
      ])
    ])
  ])
}
var h = require("hyperscript");
module.exports = function() {
  return {
    template: render().outerHTML,
    controller: ["$scope", "contentful", "store", controller]
  }
};
