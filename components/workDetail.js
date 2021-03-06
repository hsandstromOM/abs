var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
  url: '/work-detail/:slug',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window',  component],
  params: {
    obj: null,
    service: null,
    slug: null
  }
}

function component ($scope, $state, store, contentful,  $uibModal, $window ) {
  $scope.page = 'workDetail'
  $scope.custom = true
  $scope.custom1 = false
  $scope.custom2 = true
  $scope.slide = {
    'down' : true
  }
  var vm = this;

  $window.scrollTo(0,0);

  if ($state.params.obj) {
    $scope.workProject = $state.params.obj
    store.set('workProject', $state.params.obj)
  } else if ($state.params.slug) {
    contentful.entries('content_type=workProjects&fields.slug=' + $state.params.slug).then(function(res) {
         $scope.workProject = res.data.items[0]
       })
  } else if (store.get('workProject')) {
    $scope.workProject = store.get('workProject')
  }
  contentful.entries('content_type=workProjects').then(function(res) {
    $scope.allWorkProjects = res.data.items
  })

  contentful.entries('content_type=workProjects').then(function(res) {
    var seoData = res.data.items[0];
    if (seoData.fields.pageTitle) {
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
  contentful.entries('content_type=workProjects').then(function(res) {
    vm.projectGallery = res.data.items[0];
  });

  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: volunteerModal().outerHTML,
      controller: 'ModalInstanceCtrl'
    });
  }

  $scope.mainPage = 'work'
  $scope.slide = {
    'workNav' : true
  }
  $scope.selectServiceProvided = function (serviceProvided) {
    $scope.currentServiceProvided = serviceProvided
    $scope.page = $scope.currentServiceProvided
  }
  if($state.params.service) {
    $scope.page = $state.params.service
    $scope.currentServiceProvided = $state.params.service
    $scope.selectedService = $state.params.service.fields.pageTitle
    $scope.selectedService = $state.params.service.fields.contactPerson
    store.set('workService', $scope.selectedService)
  } else if(store.get('selectedWorkService')){
    $scope.currentServiceProvided = store.get('selectedWorkService')
    $scope.selectedService = $scope.currentServiceProvided.fields.pageTitle
    $scope.selectedService = $scope.currentServiceProvided.fields.contactPerson

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
    $scope.page = $scope.currentService.fields.contactPerson
    $scope.pageSlug = $scope.currentService.fields.pageTitle
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
  return h('div#workDetailPage', [
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
            h("div.wrkDetail.col-sm-12", [
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
                  h("img.hxImg.work.Centered", {
                    "style":"margin-top:-165px",
                    "src":"img/doubleHoney.png"
                  }),
                  h("div.gallery-text.work", {
                    'style':'margin-top:-30px;'
                  },[
                    h('img',{'src':'img/contact_icon.png'}),
                    h("h4.hextitle", [
                      "INTERESTED IN",
                      h("br"),
                      "WORKING TOGETHER?"
                    ]),
                    h("h5.hexname.tk-aaux-next", "{{currentServiceProvided.fields.contactPerson.fields.name}} {{currentServiceProvided.fields.contactPerson.fields.lastName}},"),
                    h("p", "{{currentServiceProvided.fields.contactPerson.fields.certificationsAndLicenses}}"),
                    // h("p", {
                    //   "style":"margin-bottom:5px"
                    // }, "Registered Architect"),
                    h("a.tk-aaux-next", {
                      'data-ng-href': 'mailto:{{currentServiceProvided.fields.contactPerson.fields.emailAddress}}',
                      'style':'text-transform:uppercase'
                    },"EMAIL {{currentServiceProvided.fields.contactPerson.fields.name}}")
                  ])
                ])
              ]),
              h("div.col-md-6.col-xs-12", {
                'data-marked':'workProject.fields.description'
              }),
              h("div.container", [
              h('br'),
              h("div.col-md-12.col-xs-12", [
                h('br'),
                h('br'),
                h("div.well", {
                  "style":"background-color:none;border:none;border-radius:0;-webkit-box-shadow:none;box-shadow:none"
                }, [
                  h("div#myCarousel.carousel.slide", [
                        h("div.carousel-inner", [
                          h("div.item.active", [
                            h("div.row", [
                              h("div.col-md-3.col-xs-12", {
                              },[
                                h("a", {
                                  "data-toggle":"modal",
                                  "data-target":"#myModal"
                                }, [
                                  h("img", {
                                   'data-ng-show': 'workProject.fields.img1.fields.file.url',
                                    "src":"{{workProject.fields.img1.fields.file.url}}",
                                    'style':'height:200px; width:253px',
                                    "alt":"Image"
                                  })
                                ])
                              ]),
                              h("div.col-md-3.col-xs-12", [
                                h("a", {
                                  "data-toggle":"modal",
                                  "data-target":"#myModal"
                                }, [
                                  h("img", {
                                   'data-ng-show': 'workProject.fields.img2.fields.file.url',
                                    "src":"{{workProject.fields.img2.fields.file.url}}",
                                    'style':'height:200px; width:253px',
                                    "alt":"Image"
                                  })
                                ])
                              ]),
                              h("div.col-md-3.col-xs-12", [
                                h("a", {
                                  "data-toggle":"modal",
                                  "data-target":"#myModal"
                                }, [
                                  h("img", {
                                    'data-ng-show': 'workProject.fields.img3.fields.file.url',
                                    "src":"{{workProject.fields.img3.fields.file.url}}",
                                    'style':'height:200px; width:253px',
                                    "alt":"Image"
                                  })
                                ])
                              ]),
                              h("div.col-md-3.col-xs-12", [
                                h("a", {
                                  "data-toggle":"modal",
                                  "data-target":"#myModal"
                                }, [
                                  h("img", {
                                    'data-ng-show': 'workProject.fields.img4.fields.file.url',
                                    "src":"{{workProject.fields.img4.fields.file.url}}",
                                    'style':'height:200px; width:253px',
                                    "alt":"Image"
                                  })
                                ])
                              ])
                            ])
                          ]),
                          h("div.item", [
                            h("div.row", [
                              h("div.col-md-3.col-xs-12", [
                                h("a", {
                                  "data-toggle":"modal",
                                  "data-target":"#myModal"
                                }, [
                                  h("img", {
                                    'data-ng-if': 'workProject.fields.img5.fields.file.url',
                                    "src":"{{workProject.fields.img5.fields.file.url}}",
                                    'style':'height:200px; width:253px',
                                    "alt":"Image"})
                                  ])
                                ]),
                                h("div.col-md-3.col-xs-12", [
                                  h("a", {
                                    "data-toggle":"modal",
                                    "data-target":"#myModal"
                                  }, [
                                    h("img", {
                                      'data-ng-show': 'workProject.fields.img6.fields.file.url',
                                      "src":"{{workProject.fields.img6.fields.file.url}}",
                                      'style':'height:200px; width:253px',
                                      "alt":"Image"})
                                    ])
                                  ]),
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img7.fields.file.url',
                                        "src":"{{workProject.fields.img7.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ]),
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img8.fields.file.url',
                                        "src":"{{workProject.fields.img8.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ])
                                ])
                              ]),
                              h("div.item", [
                                h("div.row", [
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img9.fields.file.url',
                                        "src":"{{workProject.fields.img9.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ]),
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img10.fields.file.url',
                                        "src":"{{workProject.fields.img10.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ]),
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img11.fields.file.url',
                                        "src":"{{workProject.fields.img11.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ]),
                                  h("div.col-md-3.col-xs-12", [
                                    h("a", {
                                      "data-toggle":"modal",
                                      "data-target":"#myModal"
                                    }, [
                                      h("img", {
                                        'data-ng-show': 'workProject.fields.img12.fields.file.url',
                                        "src":"{{workProject.fields.img12.fields.file.url}}",
                                        'style':'height:200px; width:253px',
                                        "alt":"Image"
                                      })
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            h("a.left.carousel-control", {
                              "data-ng-href":"#myCarousel",
                              "data-slide":"prev"
                            }, [
                              h("i.fa.fa-2x.fa-angle-left", {
                              })
                            ]),
                            h("a.right.carousel-control", {
                              "data-ng-href":"#myCarousel",
                              "data-slide":"next"
                            }, [
                              h("i.fa.fa-2x.fa-angle-right", {
                              })
                            ]),

                          ])
                        ]),
                        h("div#myModal.modal.fade", {
                          "tabindex":"-1;",
                          "role":"dialog;",
                          "aria-labelledby":"myModalLabel"
                        }, [
                          h("div.modal-dialog", {
                            "style":"margin-top:150px",
                            "role": 'document'
                          }, [
                            h("div.modal-content.mod", {
                            }, [
                              h("div.well.mod", {
                                "style":"background-color:none;border:none;border-radius:0;-webkit-box-shadow:none;box-shadow:none"
                              }, [
                                h("div#myCarousel2.carousel.slide", [
                                  h("i.fa.fa-2x.fa-times-circle-o", {
                                    "type": 'button',
                                    'aria-label': 'close',
                                    "aria-hidden":"true",
                                    'data-dismiss': 'modal',
                                    "style": "float:right"
                                  }
                                ),
                                      h("div.carousel-inner.mod", [
                                        h("a.left.carousel-control.mod", {
                                          "data-ng-href":"#myCarousel2",
                                          "data-slide":"prev"
                                        }, [
                                          h("i.fa.fa-2x.fa-angle-left.mod", {
                                          })
                                        ]),
                                        h("a.right.carousel-control.mod", {
                                          "data-ng-href":"#myCarousel2",
                                          "data-slide":"next"
                                        }, [
                                          h("i.fa.fa-2x.fa-angle-right.mod", {
                                          })
                                        ]),
                                        h("div.item.active", [
                                          h("div.row.mod", [
                                            h("iframe", {
                                              'data-ng-show': 'workProject.fields.video1',
                                              'data-ng-src':"https://www.youtube.com/embed/5G1XFtwfs5U",
                                              'frameborder': "0",
                                              'allowfullscreen': ""
                                            }),
                                            h("img", {
                                              'data-ng-hide': 'workProject.fields.title === "Premises Safety – Trip & Fall"',
                                              "src":"{{workProject.fields.img1.fields.file.url}}",
                                              "alt":""
                                            })

                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                          //   h("i.fa.fa-times-circle", {
                                          //   //  "style":"padding:10px;margin-left: 410px",
                                          //     "type": 'button',
                                          //     'aria-label': 'close',
                                          //     "aria-hidden":"true",
                                          //     'data-dismiss': 'modal'
                                          //   }
                                          // ),
                                                h("img", {
                                                  "src":"{{workProject.fields.img2.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img3.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img4.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img5.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img6.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img7.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img8.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img9.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img10.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img11.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),
                                        h("div.item", [
                                          h("div.row.mod", [
                                                h("img", {
                                                  "src":"{{workProject.fields.img12.fields.file.url}}",
                                                  "alt":""
                                                })
                                          ])
                                        ]),


                                          ]),
                                          // h("a.left.carousel-control.mod", {
                                          //   "data-ng-href":"#myCarousel2",
                                          //   "data-slide":"prev"
                                          // }, [
                                          //   h("i.fa.fa-2x.fa-angle-left.mod", {
                                          //   })
                                          // ]),
                                          // h("a.right.carousel-control.mod", {
                                          //   "data-ng-href":"#myCarousel2",
                                          //   "data-slide":"next"
                                          // }, [
                                          //   h("i.fa.fa-2x.fa-angle-right.mod", {
                                          //   })
                                          // ]),

                                        ])
                                      ]),
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
