var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')
module.exports = {
  url: '/team',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', '$q', component],
  params: {
    'division': null
  }
}

function component ($scope, $state, store, contentful, $uibModal, $window, $q) {
  $scope.slide = {
    'teamNav': true
  }
  $scope.filteredMembers = [
    [],[],[],[],[],[],[],[],[]
  ]
  $scope.setCurrentTeamMember = function (member) {
    $scope.currentTeamMember = member
  }
  $scope.mainPage = 'team'

  contentful.entries('content_type=team').then(function(res) {
    $scope.teamPage = res.data.items[0]
  })

  if($state.params.division) {
    $scope.currentDivision = $state.params.division
  } else {
    $scope.currentDivision = 'All'
  }

  function comparePriority(a,b) {
    if (a.fields.priority < b.fields.priority)
      return -1;
    if (a.fields.priority > b.fields.priority)
      return 1;
    return 0;
  }

  function sortMembers(members) {
    var deferred = $q.defer();
    var sortedMemberCache = []
    angular.forEach(members, function(member){
      sortedMemberCache.push(member)
      sortedMemberCache.sort(comparePriority)
    })
    deferred.resolve(sortedMemberCache)
    return deferred.promise;
  }

  if($scope.currentDivision) {
    contentful.entries('content_type=teamMembers&include=3').then(function(res) {
      var items = res.data.items
      var index = 1
      var switchAt = 5
      var arrayVal = 0
      sortMembers(items).then(function(sortedMembers){
        angular.forEach(sortedMembers, function(member){
          if(member.fields.division){
            if(member.fields.division === $scope.currentDivision || $scope.currentDivision === 'All') {
              if(switchAt === 5) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 5
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
        })
      })
    })
  }
}

function render () {
  return h('div#homePage', [
    h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide',
      }),
      h("div.closeNav", {
        'style':'margin-top:95px;'
      }, [
        h("div#bloc-7.bloc.bgc-white.bg-Team-Placeholder-Header.d-bloc",
        [
          h("div.container.bloc-lg", [
            h("div.row", [
              h("div.col-sm-12", [
                h("h1.mg-md.text-center.tc-white", '{{teamPage.fields.bannerHeadline}}')
              ])
            ])
          ])
        ])
      ]),
      h("div#bloc-12.bloc.bg-Halftone-Pattern.tc-prussian-blue", {
        "style":"background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05);height:80%"
      }, [
        h("div.container.bloc-lg", [
          h("div.row", {
            'style':'padding-bottom:50px;'
          }, [
            h("div.col-sm-10.col-sm-offset-1", [
              h("h3.tk-aaux-next.mg-md.text-left.tc-prussian-blue", {
                "style":"font-size:24px;line-height:28px"
              }, [
                h("strong", '{{teamPage.fields.contentTitle}}')
              ]),
              h("p.tk-aaux-next.mg-md.text-left.tc-prussian-blue", '{{teamPage.fields.pageContent}}')
            ])
          ]),
          h("div.row.voffset", [
            h("div.honeyCombContainer#honeyCombContainer", {
              "style":"position:relative;width:965px;display:block;margin:0 auto"
            }, [
              h('.honeyCombRowOfFour', {
                'data-ng-if': 'filteredMembers.length'
              }, [
                h("a.honeyComb", {
                  "data-toggle":"modal",
                  "data-target":"#myModal",
                  'data-ng-click': 'setCurrentTeamMember(member)',
                  'data-ng-repeat': 'member in filteredMembers[0]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ]),
              ]),
              h('.honeyCombRowOfThree', {
                'data-ng-if': 'filteredMembers.length > 4'
              }, [
                h("a.honeyComb", {
                 "data-toggle":"modal",
                 "data-target":"#myModal",
                 'data-ng-click': 'setCurrentTeamMember(member)',
                 'data-ng-repeat': 'member in filteredMembers[1]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ])
              ]),
              h('.honeyCombRowOfFour', {
                'data-ng-if': 'filteredMembers.length > 7'
              }, [
                h("a.honeyComb", {
                  "data-toggle":"modal",
                  "data-target":"#myModal",
                  'data-ng-click': 'setCurrentTeamMember(member)',
                  'data-ng-repeat': 'member in filteredMembers[2]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ]),
              ]),
              h('.honeyCombRowOfThree', {
                'data-ng-if': 'filteredMembers.length > 11'
              }, [
                h("a.honeyComb.threeRow", {
                  "data-toggle":"modal",
                  "data-target":"#myModal",
                  'data-ng-click': 'setCurrentTeamMember(member)',
                 'data-ng-repeat': 'member in filteredMembers[3]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ])
              ]),
              h('.honeyCombRowOfFour', {
                'data-ng-if': 'filteredMembers.length > 14'
              }, [
                h("a.honeyComb", {
                  "data-toggle":"modal",
                  "data-target":"#myModal",
                  'data-ng-click': 'setCurrentTeamMember(member)',
                  'data-ng-repeat': 'member in filteredMembers[4]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ])
              ]),
              h('.honeyCombRowOfThree', {
                'data-ng-if': 'filteredMembers.length > 18'
              }, [
                h("a.honeyComb.threeRow", {
                  "data-toggle":"modal",
                  "data-target":"#myModal",
                  'data-ng-click': 'setCurrentTeamMember(member)',
                 'data-ng-repeat': 'member in filteredMembers[5]'
                }, [
                  h("img.overlayer", {
                    "src":'img/greenOverlay.png',
                    'style': 'position:absolute;'
                  }),
                  h("img", {
                    "data-ng-src": "{{member.fields.thumbnail.fields.file.url}}"
                  }),
                  h("div.hexText", {
                    "style":"height:284px;padding-top:53%;width:253px;position:absolute;z-index:2;text-align:center;top:-10px"
                  }, [
                    h("span", {
                      "style":"font-weight:bold;color:white;display:inline-block;vertical-align:middle"
                    }, '{{member.fields.name}}')
                  ])
                ])
              ]),
            ])
          ])
        ]),
        h("div#myModal.modal.fade", {
          "tabindex":"-1;",
          "role":"dialog;",
          "aria-labelledby":"myModalLabel"
        }, [
          h("div.modal-dialog", {
            "style":"margin-top:150px;left:-6%",
            "role": 'document'
          }, [
            h("div.modal-content", {
              "style":"border-radius:0;height:402px;width:130%"
            }, [
              h("div.modal-body", {
                "style":"padding:0"
              }, [
                h("button.close", {
                  "style":"padding:10px",
                  "type": 'button',
                  'aria-label': 'close',
                  'data-dismmiss': 'modal'
                }, [
                  h("span", {
                    "aria-hidden":"true"
                  }, "x")
                ]),
                h("div.col-sm-4", {
                  "style":"padding:0"
                }, [
                  h("img", {
                    "data-ng-src":"{{currentTeamMember.fields.fullImage.fields.file.url}}",
                    "alt":""
                  })
                ]),
                h("div.col-sm-7", {
                  "style":"padding-left:40px"
                }, [
                  h("h4", {
                    "style":"padding-top:50px"
                  }, [
                    h("strong", "{{currentTeamMember.fields.name}}")
                  ]),
                  h("h4", "{{currentTeamMember.fields.certificationsAndLicenses}}"),
                  h("p", "{{currentTeamMember.fields.bio}}" ),
                  h("div", {
                    "style":"display:block"
                  }, [
                    h("a", {
                      "style":"display:inline;text-decoration:underline",
                      'data-ng-href': 'mailto:{{currentTeamMember.fields.emailAddress}}'
                    }, "EMAIL {{currentTeamMember.fields.name}}"),
                    h('br'),
                    h("a", {
                      "style":"display:inline;text-decoration:underline"
                    }, "DOWNLOAD C.V.")
                  ])
                ])
              ])
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
