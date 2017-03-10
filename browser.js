window.PouchDB = require('pouchdb')

var ng = require('angular')
var $ = require('jquery')
var ee = require('./services')()
var h = require('hyperscript')
var moment = require('moment')
var underscore = require('underscore')
var prerender = require('prerender-node').set('prerenderToken', 'bCDSypXLkVdEzThyUTfR')

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

    // 301 Redirects
    //Home
    $urlRouterProvider.when('/pages/page.asp?page_id=282699', '/', 301)
    //Who We Are
    $urlRouterProvider.when('/pages/page.asp?page_id=289313', '/', 301)
    //Team
    $urlRouterProvider.when('/pages/page.asp?page_id=289315', '/team', 301)
    //CV PDF
    $urlRouterProvider.when('/uploads/abs_paul_kennedy_cv_672014.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/Alan_Campbell_Roof_Consult_cv.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/Alan_Campbell_Life_safety_cv.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_jason_gregorie_cv_May_2015.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_bobby_funcik_cv_2016.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_john_greenan_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_luis_mariaca_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/Steve_Moore_CV_04152016.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_edward_polk_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/RESUME_AJS_2_4_2016.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_joe_shahid_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/Parker_Shields_cv.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_stephanie_w_borzendowski_cv.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_lee_capell_cv.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/RKD_CV_52016.pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_wayne_butler_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_scott_harvey_cv(1).pdf', '/team', 301)
    $urlRouterProvider.when('/uploads/abs_whitney_okon_cv_2014.pdf', '/team', 301)
    //In The News
    $urlRouterProvider.when('/pages/page.asp?page_id=304912', '/', 301)
    //Services
    $urlRouterProvider.when('/pages/page.asp?page_id=285535', '/services', 301)
    //Building Enclosure
    $urlRouterProvider.when('/pages/page.asp?page_id=289324', '/services', 301)
    //Structural Engineering
    $urlRouterProvider.when('/structural', '/services', 301)
    $urlRouterProvider.when('/pages/page.asp?page_id=290920', '/services', 301)
    //Civil Engineering
    $urlRouterProvider.when('/pages/page.asp?page_id=285531', '/services', 301)
    //Architecture
    $urlRouterProvider.when('/pages/page.asp?page_id=284943', '/services', 301)
    //Environmental
    $urlRouterProvider.when('/pages/page.asp?page_id=285528', '/services', 301)
    //Training & Contuing Education
    $urlRouterProvider.when('/pages/page.asp?page_id=285532', '/services', 301)
    $urlRouterProvider.when('/uploads/2016_Asbestos_Course_Schedule(2).pdf', '/services', 301)
    $urlRouterProvider.when('/uploads/2016_Lead_Course_Schedule_revised.pdf', '/services', 301)
    $urlRouterProvider.when('/pages/page.asp?page_id=296287', '/services', 301)
    $urlRouterProvider.when('/pages/page.asp?page_id=296288', '/services', 301)
    //Contact
    $urlRouterProvider.when('/pages/page.asp?page_id=289319', '/contact', 301)
    //Search
    $urlRouterProvider.when('/search.asp', '/', 301)
    //Sitemap
    $urlRouterProvider.when('/sitemap', '/sitemap.xml', 301)
    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('home', require('./components/home'))
      .state('contact', require('./components/contact'))
      .state('team', require('./components/team'))
      .state('services', require('./components/services'))
      //WORK//
      .state('work', require('./components/work'))
      .state('workDetail', require('./components/workDetail'))
      .state('sitemap.xml', {url: '/sitemap.xml'})

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

   (function() {
  try {
    var a = new Uint8Array(1);
    return; //no need
  } catch(e) { }

  function subarray(start, end) {
    return this.slice(start, end);
  }

  function set_(array, offset) {
    if (arguments.length < 2) offset = 0;
    for (var i = 0, n = array.length; i < n; ++i, ++offset)
      this[offset] = array[i] & 0xFF;
  }

  // we need typed arrays
  function TypedArray(arg1) {
    var result;
    if (typeof arg1 === "number") {
       result = new Array(arg1);
       for (var i = 0; i < arg1; ++i)
         result[i] = 0;
    } else
       result = arg1.slice(0);
    result.subarray = subarray;
    result.buffer = result;
    result.byteLength = result.length;
    result.set = set_;
    if (typeof arg1 === "object" && arg1.buffer)
      result.buffer = arg1.buffer;

    return result;
  }

  window.Uint8Array = TypedArray;
  window.Uint32Array = TypedArray;
  window.Int32Array = TypedArray;
})();


(function() {
  if ("response" in XMLHttpRequest.prototype ||
      "mozResponseArrayBuffer" in XMLHttpRequest.prototype ||
      "mozResponse" in XMLHttpRequest.prototype ||
      "responseArrayBuffer" in XMLHttpRequest.prototype)
    return;
  Object.defineProperty(XMLHttpRequest.prototype, "response", {
    get: function() {
      return new Uint8Array( new VBArray(this.responseBody).toArray() );
    }
  });
})();

(function() {
  if ("btoa" in window)
    return;

  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  window.btoa = function(chars) {
    var buffer = "";
    var i, n;
    for (i = 0, n = chars.length; i < n; i += 3) {
      var b1 = chars.charCodeAt(i) & 0xFF;
      var b2 = chars.charCodeAt(i + 1) & 0xFF;
      var b3 = chars.charCodeAt(i + 2) & 0xFF;
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);
      var d3 = i + 1 < n ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
      var d4 = i + 2 < n ? (b3 & 0x3F) : 64;
      buffer += digits.charAt(d1) + digits.charAt(d2) + digits.charAt(d3) + digits.charAt(d4);
    }
    return buffer;
  };
})();

// manually bootstrap angular
// ng.element(document).ready(function() {
//   ng.bootstrap(document, ['app'])
// })
