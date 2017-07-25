var h = require('hyperscript')
var headerNav = require('./shared/headerNav')
var footer = require('./shared/footer')

module.exports = {
  url: '/team',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', '$q', component],
  params: {
    'division': null,
  }
}

function component($scope, $state, store, contentful, $uibModal, $window, $q) {
  $scope.slide = {
    'teamNav': true
  }

  //  $scope.sortType = 'lastName'
  //  $scope.sortReverse = false

  $scope.filteredMembers= [
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]
  ],
  $scope.setCurrentTeamMember = function (member) {
    $scope.currentTeamMember = member
  }
  $scope.mainPage = 'team'

  contentful.entries('content_type=team').then(function(res) {
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
	})

  contentful.entries('content_type=teamMembers').then(function(res) {
		var seoData = res.data.items[0];
		if (seoData.fields.pageTitle) {
			document.title = seoData.fields.pageTitle;
		}
		if (seoData.fields.pageSpecificMetaDescriptionSeo) {
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name.toLowerCase() === "description") {
					meta[i].content = seoData.fields.pageSpecificMetaDescriptionSeo;
				}
			}
		}
	})

  contentful.entries('content_type=team').then(function(res) {
    $scope.teamPage = res.data.items[0]
  })

  $state.params.all = 'All'

  if($state.params.division) {
    $scope.currentDivision = ($state.params.division)
  } else {
    $scope.currentDivision = "All"
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
      var switchAt = 4
      var arrayVal = 0
      sortMembers(items).then(function(sortedMembers){
        angular.forEach(sortedMembers, function(member){
          if(member.fields.all){
            if(member.fields.all === $scope.currentDivision) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
        })
      })
      sortMembers(items).then(function(sortedMembers){
        angular.forEach(sortedMembers, function(member){
          if(member.fields.division){
            if(member.fields.division === $scope.currentDivision) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
          if(member.fields.division2){
            if(member.fields.division2 === $scope.currentDivision ) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
          if(member.fields.division3){
            if(member.fields.division3 === $scope.currentDivision ) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
          if(member.fields.division4){
            if(member.fields.division4 === $scope.currentDivision ) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
          if(member.fields.division5){
            if(member.fields.division5 === $scope.currentDivision ) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              }
            }
          }
          if(member.fields.division6){
            if(member.fields.division6 === $scope.currentDivision ) {
              if(switchAt === 4) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 3
                    $scope.filteredMembers[arrayVal].push(member)
                  index = 1
                  arrayVal ++
                }
              } else if (switchAt === 3) {
                if(index < switchAt) {
                  $scope.filteredMembers[arrayVal].push(member)
                  index ++
                } else {
                  switchAt = 4
                    $scope.filteredMembers[arrayVal].push(member)
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

function render() {
  return h('div#TeamPage', [h("div.page-container", [
      h('div', {
        'data-navheader': '',
        'data-mainPage': 'mainPage',
        'data-slide': 'slide'
      }),
      h("div#bloc-1.bloc.bgc-white.bg-Header-Placeholder.d-bloc", {
        'style': 'max-height:100vh;'
      }, [
        h('img.honeycomb-left', {
          'src': 'img/honeycomb_pattern.png',
          'style': "max-height:350px;z-index:1;margin-left:-50px !important;"
        }),
        h('img.honeycomb-right', {
          'src': 'img/honeycomb.png',
          'style': "max-height:540px;z-index:1;margin-right:-50px !important;"
        }),
        h("div.row", [h("div.col-sm-12.vertical-align", {
            'style': 'margin-top:-210px;text-transform: uppercase;'
          }, [h("h1.mg-md.text-center.vertical-align.tc-white", '{{teamPage.fields.bannerHeadline}}')])])
        //])
      ]),
      h("div#bloc-12.bloc.bg-Halftone-Pattern.tc-prussian-blue", {
        "style": "background-color:#F6F6F6;-webkit-box-shadow:inset 0 10px 5px 2px rgba(0,0,0,.05);box-shadow:inset 0 -3px 8px 4px rgba(0,0,0,.05);height:80%"
      }, [
        h("div.container.bloc-lg", [
          h("div.row", {}, [h("div.col-sm-10.col-sm-offset-1", [
              h("h3.tk-aaux-next.mg-md.text-left.tc-prussian-blue", {
                "style": "font-size:24px;line-height:28px"
              }, [h("strong", '{{teamPage.fields.contentTitle}}')]),
              h("p.tk-aaux-next.mg-md.text-left.tc-prussian-blue", '{{teamPage.fields.pageContent}}')
            ])]),
          h("div.row.voffset", [h("div.honeyCombContainer#honeyCombContainer", {}, [
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[0]'
              }, [h(".shadow", [h(".hexContainer#hexContainer", [h(".hexThumb#hexThumb", [
                      h("img", {
                        "data-ng-src": "{{member.fields.fullImage.fields.file.url}}",
                        "alt": '{{member.fields.name}} {{member.fields.lastName}} Bio Pic'
                      }),
                      h("p", {}, '{{member.fields.name}}', " ", '{{member.fields.middleName}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[1]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[2]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[3]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[4]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[5]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])]),
              h("a.honeyComb", {
                "data-toggle": "modal",
                "data-target": "#myModal",
                'data-ng-click': 'setCurrentTeamMember(member)',
                'data-ng-repeat': 'member in filteredMembers[6]'
              }, [h("div.shadow", [h("div.hexContainer", [h(".hexThumb", [
                      h("img", {"data-ng-src": "{{member.fields.fullImage.fields.file.url}}"}),
                      h("p", '{{member.fields.name}}', " ", '{{member.fields.lastName}}')
                    ])])])])
            ])])
        ]),
      ]),
      h('div', {'data-footermenu': ''})
    ]),
    h("div#myModal.modal.fade", {
      "tabindex": "-1;",
      "role": "dialog;",
      "aria-labelledby": "myModalLabel"
    }, [h("div.modal-dialog", {
        "role": 'document'
      }, [h("div.modal-content.team", {}, [h("div.modal-body", {}, [
            h("div.container", {
              "style": "padding: 0;"
            }, [
              h("div.col-sm-12", {
                "style": "float:none;"
              }, [
                h("i.fa.fa-2x.fa-times-circle-o", {
                  'aria-label': 'close',
                  "aria-hidden": "true",
                  "data-dismiss": "modal",
                  "style": "float:right; padding:5px"
                }),
              ]),
              h("div.col-md-6.col-sm-12", {}, [
              h("img.tm.img-responsive", {
                "data-ng-src": "{{currentTeamMember.fields.fullImage.fields.file.url}}",
                "alt": ""
              })
            ]),
            h("div.col-md-6.col-sm-12", {}, [
              h("h4.tk-aaux-next", {
                "style": "padding-top:20px;text-transform: uppercase;padding-bottom: 5px"
              }, [h("strong", "{{currentTeamMember.fields.name}}", " ", "{{currentTeamMember.fields.lastName}}", ",")]),
              h("h4", {
                "style": "padding-bottom: 5px"
              }, "{{currentTeamMember.fields.certificationsAndLicenses}}"),
              h("p", {
                "style": "letter-spacing: -0.7px;line-height: 1.3em;padding-bottom: 15px"
              }, "{{currentTeamMember.fields.bio}}"),
              h("div", {
                "style": "display:block"
              }, [h("p", [
                  h("a.tk-industry", {
                    "style": "font-size:16px;color:#73B53d;display:inline;text-decoration:underline;text-transform: uppercase;margin-right: 10px;letter-spacing: .1em",
                    'data-ng-href': 'mailto:{{currentTeamMember.fields.emailAddress}}'
                  }, "EMAIL {{currentTeamMember.fields.name}}"),
                  h("nbsp", " ")
                ])
              ])
            ]),
          ])
          ])
        ])])])
  ])
}
