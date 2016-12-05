module.exports = function () {
  return function(items, currentServiceProvided) {
    var workProjectsFiltered = [];
    angular.forEach(items, function(item) {
      if(item.fields.services){
        var servicesProvided = item.fields.services
        angular.forEach(servicesProvided, function(service){
          if (service.fields.pageTitle === currentServiceProvided) {
            if (workProjectsFiltered.indexOf(item) == -1) {
              workProjectsFiltered.push(item);
            }
          }
        })
      }
    });
    return workProjectsFiltered;
  };
}
