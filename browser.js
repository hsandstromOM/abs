window.PouchDB = require('pouchdb')

var ng = require('angular')
var $ = require('jquery')
var ee = require('./services')()
var h = require('hyperscript')
var moment = require('moment')
var underscore = require('underscore')
// var prerender = require('prerender-node')

window.angular = ng
require('angular-resource')
require('angular-sanitize')
require('angular-cookies')
require('auth0-angular')
require('angular-storage')
require('angular-slugify')
require('angular-jwt')
require('angucomplete-alt')
require('./components/contentfulWrapper')
require('ngMap')
require('angular-ui-bootstrap')
require('angular-marked')
require('prerender-node').set('prerenderToken', 'bCDSypXLkVdEzThyUTfR')


document.body.appendChild(
  h('div', { 'data-ui-view': '' })
)

document.head.appendChild(
  h('link', {
    rel: 'stylesheet',
    href: 'main.css'
  })
)

ng.module('app', [
  require('angular-ui-router'),
  'ngResource',
  'ngSanitize',
  'angular-storage',
  'angular-jwt',
  'angucomplete-alt',
  'contentful',
  'ui.bootstrap',
  'hc.marked',
  'ngMap',
  'slugifier'
])
  .constant('ee', ee)
  .constant('moment', moment)
  .constant('underscore', underscore)
  .config(['$urlRouterProvider', '$stateProvider', 'contentfulProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, contentfulProvider, $locationProvider) {

    contentfulProvider.setOptions({
      space: 'lxejsmju70ex',
      accessToken: '2ef82748feb6fd9e7d78f7103794d27612337c3499abc02d7f21c1fb4ee5c627'
    })


    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('home', require('./components/home'))
      .state('contact', require('./components/contact'))
      .state('team', require('./components/team'))
      .state('services', require('./components/services'))
      //WORK//
      .state('work', require('./components/work'))
      .state('workDetail', require('./components/workDetail'))

    $locationProvider.html5Mode({
        enabled: true,
    })
   }])
   .filter('serviceProvided', require('./filters/serviceProvided.js'))
   .filter('service', require('./filters/serviceProvided.js'))
   .filter('telephone', require('./filters/telephone.js'))
   .directive('navheader', require('./components/shared/headerNav.js'))
   .directive('homehex', require('./components/homeHex.js'))
   .directive('footermenu', require('./components/shared/footer.js'))
   .factory('emailSvc', ['$http', require('./factories/email')])
   .service('PageTitle', function(){
     var title = 'Applied Building Sciences';
     return {
       title: function() {return title; },
       setTitle: function(newTitle) { title = newTitle; }
     };
   })

// manually bootstrap angular
ng.element(document).ready(function() {
  ng.bootstrap(document, ['app'])
})
