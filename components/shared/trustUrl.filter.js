// I got this from Sdd Sdei
// StackOverflow: http://stackoverflow.com/questions/15728424/html5-video-is-not-working-with-angularjs-ng-src-tag

angular
  .module('app')
  .filter("trustUrl", trustUrl);

  trustUrl.$inject = ['$sce'];

  function trustUrl($sce) {
      return function (mediaUrl) {
        return $sce.trustAsResourceUrl(mediaUrl);
      };
  }
