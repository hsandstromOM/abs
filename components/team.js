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

function component($scope, $state, store, contentful, $uibModal, $window, $q) {
  $scope.slide = {
    'teamNav': true
  }

  $scope.sortType = 'lastName'
  $scope.sortReverse = false

  $scope.filteredMembers= [
    [],[],[],[],[],[],[],[],[],[],[],[]
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
      h("div#bloc-1.bloc.bgc-white.bg-Header-Placeholder.d-bloc", {'style':'max-height:75vh;'},[
        h('img.honeycomb-left',{
          'src':'img/honeycomb_pattern.png',
          'style':"max-height:310px;z-index:1;margin-left:-50px !important;"
        }),
        h('img.honeycomb-right',{
          'src':'img/honeycomb.png',
          'style':"max-height:450px;z-index:1;margin-right:-50px !important;"
        }),
        //h("div.container.bloc-xxl", {'style':'z-index:2; '},[
          h("div.row", [
            h("div.col-sm-12.vertical-align", {'style':'margin-top:-180px;text-transform: uppercase;'},[
              h("h1.mg-md.text-center.vertical-align.tc-white", '{{teamPage.fields.bannerHeadline}}')
            ])
          ])
        //])
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
              "style":"position:relative;width:1200px;display:block;margin:0 auto"
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
                ])
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
                ])
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
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
                  h("div.shadow", [
                    h("div.hexContainer", [
                      h(".hexThumb",[
                        h("img", {
                          "data-ng-src": "{{member.fields.fullImage.fields.file.url}}"
                        }),
                        h("p", '{{member.fields.name}}'," ",'{{member.fields.lastName}}')
                      ])
                    ]),
                  ]),
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
              "style":"border-radius:0;height:380px;width:140%"
            }, [
              h("div.modal-body", {
                "style":"padding:0"
              }, [

                h("div.col-sm-6", {
                 "style":"padding-left: 0px;  padding-right: 0px;width: 360px"
               }, [
                 h("img.img-responsive", {
                   "style": "max-height: 380px",
                   "data-ng-src":"{{currentTeamMember.fields.fullImage.fields.file.url}}",
                   "alt":""
                 })
               ]),

                h("div.col-sm-6", {
                  "style":"padding-left:30px;padding-right:20px; height: 380px;width: 450px"
                }, [
                  h("i.fa.fa-times-circle", {
                    "style":"padding:10px;margin-left: 410px",
                    "type": 'button',
                    'aria-label': 'close',
                    "aria-hidden":"true",
                    'data-dismiss': 'modal'
                  }
                ),
                  h("h4.tk-aaux-next", {
                    "style":"padding-top:20px;text-transform: uppercase;padding-bottom: 5px"
                  }, [
                    h("strong", "{{currentTeamMember.fields.name}}"," ", "{{currentTeamMember.fields.lastName}}", ",")
                  ]),
                  h("h4", {
                    "style": "padding-bottom: 5px"
                  }, "{{currentTeamMember.fields.certificationsAndLicenses}}"),
                  h("p", {
                    "style": "letter-spacing: -0.7px;line-height: 1.3em;padding-bottom: 15px"
                  }, "{{currentTeamMember.fields.bio}}" ),
                  h("div", {
                    "style":"display:block"
                  }, [
                    h("p", [
                      h("a.tk-industry", {
                        "style":"font-size:16px;color:#73B53d;display:inline;text-decoration:underline;text-transform: uppercase;margin-right: 10px;letter-spacing: .1em",
                        'data-ng-href': 'mailto:{{currentTeamMember.fields.emailAddress}}'
                      }, "EMAIL {{currentTeamMember.fields.name}}"),
                      h("nbsp", " "),
                      h("a.tk-industry", {
                        "style":"font-size:16px;color:#73B53d;display:inline;text-decoration:underline;letter-spacing: .1em",
                        'data-ng-href': '{{currentTeamMember.fields.cV}}',
                        'target': '_blank',
                      }, "DOWNLOAD C.V.")
                    ])

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
