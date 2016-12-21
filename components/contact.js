var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
  url: '/contact',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', 'NgMap', '$http', component]
}

function component ($scope, $state, store, contentful,  $uibModal, $window, NgMap, $http) {
  NgMap.getMap().then(function(map) {
  $scope.map = map;
  });
  $scope.custom = true
  $scope.custom1 = true
  $scope.custom2 = true
  $scope.page = 'contact'
  contentful.entries('content_type=contactPage').then(function(res) {
    $scope.contentfulData = res.data.items[0]
  //  console.log("hey", $scope.contentfulData.fields.buttonText)
  })
  contentful.entries('content_type=locations').then(function(res) {
    $scope.allOffices = res.data.items
    console.log($scope.allOffices)
  })
  $scope.currentLocation = 'charleston'
  $scope.setLocation = function (location) {
    if(location === 'charleston') {
      $scope.map.setCenter(new google.maps.LatLng(32.8270709, -79.94791599999996))
      $scope.map.setZoom(16)
      $scope.currentLocation = 'charleston'
    } else if (location === 'charlotte') {
      $scope.map.setCenter(new google.maps.LatLng(35.1650583, -80.88442550000002))
      $scope.map.setZoom(16)
      $scope.currentLocation = 'charlotte'
    } else if (location === 'chapin') {
      $scope.map.setCenter(new google.maps.LatLng(34.168036, -81.35783600000002))
      $scope.map.setZoom(16)
      $scope.currentLocation = 'chapin'
    }
  }


  $scope.setMarker = function(office) {
    console.log(office.latLng);

    var markerLat = office.latLng.lat()
    var markerLon = office.latLng.lng()
    console.log(markerLat, markerLon);
  }

  $scope.showOffice = function(event, officeId) {
    $scope.office = $scope.allOffices[officeId];
   console.log($scope.office.fields);
   $scope.map.showInfoWindow('foo', this);
  };

  $scope.sendContact = function(){
    console.log('yo');
    console.log($scope.contact);
  }


}
// ####### Email code is here, tie form data to this
// ####### Leave contact info blank, its a honeypot check to keep bots out
// $scope.contactForm = {
//     'contactInfo': ''
// }
// $scope.submitForm = function() {
//   if ($scope.contactForm.contactInfo === '') {
//     var url =  "/api/email/send"
//     var obj = $scope.contactForm
//   //  emailSvc.send(obj).then(function success() {
//   $http.post(url, obj).then(function success() {
//       console.log('success')
//       $scope.confirm()

//     }, function error() {
//         console.log('error')

//     })
//   } else {
//     console.log('spam boi')
//   }
// }

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
        'data-slide': 'slide',
      }),
      h("div#bloc-1.bloc.bgc-white.bg-header-image4.d-bloc", {'style':'max-height:75vh;'},[
        h('img.honeycomb-left',{
          'src':'img/honeycomb_pattern.png',
          'style':"max-height:275px;z-index:1;margin-left:-50px !important;"
        }),
        h('img.honeycomb-right',{
          'src':'img/honeycomb.png',
          'style':"max-height:450px;z-index:1;margin-right:-50px !important;"
        }),
        //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
          h("div.row", [
            h("div.col-sm-12", {'style':'margin-top:-180px;text-transform: uppercase;'},[
              h('h1.mg-md.text-center.tc-white', '{{contentfulData.fields.bannerText}}')
            ])
          ])
        //])
      ]),
      h("div.closeNav", [
      h('ng-map.breakMargin', {
        'style': 'display:block;width:100%;height:600px;',
        'data-zoom-to-include-markers': 'true'
      }, [
          h('marker', {
            'data-ng-repeat': '(id, office) in allOffices',
            "id":  '{{id}}',
            'data-position': '{{office.fields.location.lat}}, {{office.fields.location.lon}}',
            'data-icon': 'img/mapMarker.png',
            'data-on-click': 'showOffice(event, id)'
          }),
        //   h('info-window#foo', {
        //   },[
        //     h('div', {
        //     //  "style": "width: 100%; line-height: 1.5em"
        //     },'{{office.fields.address}}'),
        //
        // ]),

        h('info-window#foo', {
      },[
        h('div', {
        //  "style": "width: 100%; line-height: 1.5em"
        },[
          h('.mobileParkHeaderInfo', {
            'style': 'padding: 10px;display: inline-block'
          }, [
            h('.mobileOfficeName', {
              'style': 'font-weight: bold'
            }, 'ABS Building Sciences'),
            h('.mobileOfficeAddress', {
              'style': 'width: 150px; line-height: 15px; font-size: 12px'
            }, '{{office.fields.address}}'),
            h('.mobileParkHours', {
              //'data-ng-show': 'parkMarker.fields.hours'
            }, [
              h('boldHours', {
                'style': 'display:inline-block;'
              }, '{{office.fields.phoneNumber | telephone:filter}}'),
              // h('.dataHours', {
              //   'style': 'font-size:1em;color:rgb(111, 114, 107); display: inline-block'
              // }, '{{parkMarker.fields.hours | uppercase}}hello')
            ]),
          ]),
  ///******* //// use below if other features needed in infowindow////////////////*****
          // h('.mobileParkHead erInfo', {
          //   'style': 'padding:20px;position:relative; display: inline-block'
          // }, [
          //   h('.mobileOfficeName', {
          //     'style': ''
          //   }, 'ABS Building Sciences'),
          //   h('.mobileOfficeAddress', {
          //     'style': 'font-size:1em;color:rgb(111, 114, 107);'
          //   }, '{{office.fields.address}}'),
          //   h('.mobileParkHours', {
          //     //'data-ng-show': 'parkMarker.fields.hours'
          //   }, [
          //     h('boldHours', {
          //       'style': 'display:inline-block;'
          //     }, 'HOURS: '),
          //     // h('.dataHours', {
          //     //   'style': 'font-size:1em;color:rgb(111, 114, 107); display: inline-block'
          //     // }, '{{parkMarker.fields.hours | uppercase}}hello')
          //   ]),
          // ]),
        ]),
      ]),
      ]),


      h("div.bg-Halftone-Pattern.col-md-12", {
        "style":"display:block;width:100%;padding-bottom:50px;background-color:#F6F6F6"
      }, [
        h("div.col-md-12", [
          h("div.honeyCombRow", {
            "style": "width:750px;display:block;margin:0 auto;height:200px;position:relative;"
          }, [
            h('.honeyCombContact',[

              h("img#charlestonOfficeHoneyComb ", {
                "style":"position:absolute;left:0px;top:-75px;z-index:2;width:250px",
                "src":"img/doubleHoney.png",
                'data-ng-click': "setLocation('charleston')",
                'data-ng-class': "currentLocation === 'charleston' ? 'selectedGreen' : 'nonSelectedBlue'"
              }),
              h("div.honeyText", {
                // "style": "position:absolute;left:0px;top:-20px;z-index:2;width:250px;text-align:center",
                'data-ng-click': "setLocation('charleston')",
                'data-ng-class': "currentLocation === 'charleston' ? 'selectedGreen' : 'nonSelectedBlue'"
              }, [
                h('img', {
                  'src':'img/contact_icon.png',
                  "style":' height:25px;',
                  'data-ng-show': "currentLocation === 'charleston'"
                }),
                h("h4.charlestonOfficeTxt", {
                  'data-ng-class': "currentLocation === 'charleston' ? 'selectedGreen' : 'nonSelectedBlue'"
                }, "CHARLESTON OFFICE"),
                h("p", ["1890 Milford Street", h('br'), "Charleston, SC", h('br'), "843.724.1456"])

              ])
            ]),
            h('.honeyCombContact', [


              h("img#chapinOfficeHoneyComb", {
                "style": "position:absolute;left:250px;top:-75px;z-index:2;width:250px",
                "src":"img/doubleHoney.png",
                'data-ng-click': "setLocation('chapin')",
                'data-ng-class': "currentLocation === 'chapin' ? 'selectedGreen' : 'nonSelectedBlue'"
              }),
              h("div.honeyText", {
                "style": "left:250px;",
                'data-ng-click': "setLocation('chapin')",
                'data-ng-class': "currentLocation === 'chapin' ? 'selectedGreen' : 'nonSelectedBlue'"
              }, [
                h('img', {
                  'src':'img/contact_icon.png',
                  "style":'height:25px;',
                  'data-ng-show': "currentLocation === 'chapin'"
                }),
                h("h4.chapinOfficeTxt", {
                  'data-ng-class': "currentLocation === 'chapin' ? 'selectedGreen' : 'nonSelectedBlue'"
                }, "CHAPIN OFFICE"),
                h("p", ["1416 Chapin Road", h('br'), "Chapin, SC", h('br'), "803.345.3833"]),

              ])
            ]),
            h('.honeyCombContact', [
              h("img#charlotteOfficeHoneyComb", {
                "style":"position:absolute;left:500px;top:-75px;z-index:2;width:250px",
                "src":"img/doubleHoney.png",
                'data-ng-click': "setLocation('charlotte')",
                'data-ng-class': "currentLocation === 'charlotte' ? 'selectedGreen' : 'nonSelectedBlue'"
              }),
              h("div.honeyText", {
                "style":"left:500px;",
                'data-ng-click': "setLocation('charlotte')",
                'data-ng-class': "currentLocation === 'charlotte' ? 'selectedGreen' : 'nonSelectedBlue'"
              }, [
                h('img', {
                  'src':'img/contact_icon.png',
                  "style":'height:25px;',
                  'data-ng-show': "currentLocation === 'charlotte'"
                }),
                h("h4.charlotteOfficeTxt", "CHARLOTTE OFFICE"),
                h("p", ["120 Greenwich Road", h('br'), "Charlotte, NC", h('br'), "704.749.3545"]),

              ])
            ])
          ])
        ]),
        h("div.col-md-8.col-md-offset-2", [
          h('br'),
          h('div', {
            "style":'margin-left:1.5%;'
          },[
            h("h3.tk-aaux-next.ltc-royal-blue-traditional", "{{contentfulData.fields.formHeadline}}"),
            h("p.ltc-royal-blue-traditional", "{{contentfulData.fields.formSubtitle}}"),
            h('br')
          ]),
          h("form#contact", {
            "action":""
          }, [
            h("div.form-group.col-md-6.tk-aaux-next", {'style':'font-size:16px;font-weight:400;'},[
              h("label.ltc-royal-blue-traditional", {'style':'font-size:16px;font-weight:400;'},{
                "for":"name"

              }, "NAME"),
              h("input#name.form-control", {
                "type":"text",
                'data-ng-model': 'contact.name',
              })
            ]),
            h("div.form-group.col-md-6", [
                h("label.ltc-royal-blue-traditional", {'style':'font-size:16px;font-weight:400;'},{
                "for":"email"
              }, "EMAIL"),
              h("input#email.form-control", {
                "type":"email",
                'data-ng-model': 'contact.email',
              })
            ]),
            h("div.form-group.col-md-6", [
                h("label.ltc-royal-blue-traditional", {'style':'font-size:16px;font-weight:400;'},{
                "for":"subject"
              }, "SUBJECT"),
              h("div", [
                h("select#subject.form-control", {
                  'data-ng-model': "contact.subject",
                },[
                  h("option", "Architecture"),
                  h("option", "Forensic Consulting"),
                  h("option", "Building Enclosure"),
                  h("option", ["Life Safety and Human Factors" ]),
                  h("option",  "Engineering Services")
                ])
              ])
            ]),
            h("div.form-group.col-md-6", [
                h("label.ltc-royal-blue-traditional", {'style':'font-size:16px;font-weight:400;'},{
                "for":"phone"
              }, "PHONE"),
              h("input#phone.form-control", {
                "type":"text",
                'data-ng-model': 'contact.phone',
              })
            ]),
            h("div.form-group.col-md-12", [
                h("label.ltc-royal-blue-traditional", {'style':'font-size:16px;font-weight:400;'},{
                "for":"message"
              }, "MESSAGE"),
              h("textarea#message.form-control", {
                "rows":"15",
                'data-ng-model': 'contact.message',
              })
            ]),
            h('.col-md-12', [
              h(".wire-btn-green-ryb.btn-sq.btn-lg", {
                "style":"float:right;background-color:#F6F6F6",
                //"type":"submit"
                'data-ng-click':'sendContact()'
              }, '{{contentfulData.fields.buttonText}}')
            ])

            // h('div', [
            //   h('div', {
            //
            //   }, 'SEND'),
            // ])


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
}
