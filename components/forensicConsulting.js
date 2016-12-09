var h = require('hyperscript')
//var headerNav = require('./shared/headerNav')
//var footer = require('./shared/footer')
module.exports = {
  url: '/forensicConsulting',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'contentful', '$uibModal', '$window', component]
}

function component ($scope, $state, store, contentful,  $uibModal, $window) {
  $scope.page = 'forensicConsulting'
  $scope.custom = true
  $scope.custom1 = true
  $scope.custom2 = false
  $scope.slide = {
    'workNav' : true
  }
  contentful.entries('content_type=serviceTypes&include=3').then(function(res) {
    var items = res.data.items
    console.log(res)
    angular.forEach(items, function(item){
      if(item.fields.pageTitle === 'FORENSIC CONSULTING') {
        $scope.contentfulData = item
      }
    })
  })
  // $scope.open = function () {
  //
  //   var modalInstance = $uibModal.open({
  //     animation: $scope.animationsEnabled,
  //     template: volunteerModal().outerHTML,
  //     controller: 'ModalInstanceCtrl'
  //   });
  // }
  contentful.entries('content_type=workProjects&include=3').then(function(res) {
    $scope.allWorkProjects = res.data.items
    console.log($scope.allWorkProjects[0])
  })
}


  // $scope.open = function () {
  //
  //   var modalInstance = $uibModal.open({
  //     animation: $scope.animationsEnabled,
  //     template: volunteerModal().outerHTML,
  //     controller: 'ModalInstanceCtrl'
  //   });
  // }




angular.module('app').controller('ModalInstanceCtrl', function( $scope, $uibModalInstance) {
  $scope.cancel = function (){
    $uibModalInstance.dismiss('cancel')
  }
})



function render () {
  return h('div#homePage', [
    h("div.page-container", [
      headerNav,
      h("div.closeNav", {'style':'margin-top:95px;'},[
        h("div#bloc-11.bloc.bgc-white.bg-team-header.d-bloc", {

        }, [
          h("div.container.bloc-lg", [
            h("div.row", [
            h("div.col-sm-12", [
              h("h4.mg-md.text-center.tc-white", "WORK:"),
              h("h1.mg-md.text-center.tc-white", "FORENSIC CONSULTING")
            ])
          ])
        ])
      ]),
      h("div#bloc-12.bloc.bg-Halftone-Pattern.tc-prussian-blue.bgc-white", [
        h("div.container.bloc-lg", {
          'style': 'padding-right:10%;padding-left:10%;'
        }, [
          h("div.row", {
            'data-ng-repeat': 'workProject in allWorkProjects'
          }, [
            h("div.col-sm-4", [
              h("img.img-responsive.center-block", {
                "data-ng-src":"{{workProject.fields.thumbnailImage.fields.file.url}}"
              })
            ]),
            h("div.col-sm-8", {
              'style': 'border-bottom:1px solid #d9dedc;padding-bottom:20px;'
            }, [
              h('br'),
              h("h2.mg-md.tc-prussian-blue",[
                h("strong", '{{workProject.fields.title}}')
              ]),
              h("p", {
                'data-marked': 'workProject.fields.description | limitTo: 200'
              }),
              h('br'),
              h("a.btn.btn-lg.btn-wire.wire-btn-green-ryb.btn-sq", {
                "data-ui-sref":"workDetail({obj: workProject})"
              }, "Read More")
            ])
          ])
        ])
      ]),
      footer
      ])
    ])
  ])
}
