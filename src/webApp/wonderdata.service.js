(function () {
'use strict';

angular.module('wonderApp', ['ui.router','ui.grid'])
.controller('WonderSelectionController', WonderSelectionController)
.service('WonderDataService', WonderDataService)
.service('WonderSearchService', WonderSearchService)
// .directive('wonderData', WonderDataDirective)
.constant('ApiBasePath', "http://www.mocky.io/v2/5bdd28dd32000075008c6227");
   
    
WonderSelectionController.$inject = ['WonderDataService', 'WonderSearchService'];
function WonderSelectionController(WonderDataService, WonderSearchService) {
  var wonders = this;
  wonders.wonderData = [];
  wonders.likes = "";
  wonders.sortTerm = "";
  wonders.searchTerm = "";
  wonders.hitsAPI = "";
//   wonder.state = $state;
  var promise = WonderDataService.getWonderName();
  promise.then(function(data) {
      wonders.hitsAPI += 1;
     console.log('PL', data.length);
     for(var i=0; i <= data.length; i++)
         {
             wonders.wonderData.push(data[i]);
         }
 });


    wonders.search = function (searchTerm) {
        wonders.foundItems = [];
        console.log(wonders.foundItems);
            if (!searchTerm)
                return;
            var promise = WonderSearchService.getMatchedWonderItems(searchTerm);
            promise.then(function (result) {
                wonders.foundItems = result;
                console.log(wonders.foundItems);
            },
            function (error) {
                console.log(error);
            });
        };
    
     wonders.sort = function (sortTerm) {
        wonders.foundItems = [];
        console.log(wonders.foundItems);
            if (!searchTerm)
                return;
            var promise = WonderSearchService.getMatchedWonderItems(searchTerm);
            promise.then(function (result) {
                wonders.foundItems = result;
                console.log(wonders.foundItems);
            },
            function (error) {
                console.log(error);
            });
        };
//   wonder.name = WonderDataService.getWonderId();


 }

WonderDataService.$inject = ['$q','$http', 'ApiBasePath'];
function WonderDataService ($q, $http, ApiBasePath) {
  var wonders = this;

  wonders.getCategoryName = function () {
      return wonders.wonderName;
  };
   
  wonders.getWonderName = function() {
      var deferred = $q.defer();
      wonders.wonderDataC = [];
      
      $http({
          method: "GET",
          url: 'data/wonder.json',
      }).then(function(response) {
        var result = response.data.data;
          console.log(result.length);
      for (var i = 0, len = result.length; i < len; i++) {
        wonders.wonderDataC.push({"Id" : result[i].id,"Place" :result[i].place, "Decription" : result[i].description, "imageURL": result[i].imageURL, "Rating" : result[i].rating,"Likes" : result[i].likes});
          console.log(wonders.wonderDataC);
      }
      deferred.resolve(wonders.wonderDataC);
    },function(result,status) {
      wonders.wonderId = "";
      deferred.reject("The wonders rest service was not accessible.");
    });
    console.log(deferred.promise);
    return deferred.promise;
      
  };

}
    
WonderSearchService.$inject = ['$http'];
function WonderSearchService($http) {
//         var URL = 'http://www.mocky.io/v2/5bdd28dd32000075008c6227';
        var URL = "data/wonder.json";

        var service = this;
        service.getMatchedWonderItems = function (searchTerm) {
            return $http({
                url: URL
            })
            .then(
                function success(response) {
                    console.log(searchTerm);
                    var result = response.data;
                    return result.data.filter(function (item) {
                        console.log('found');
                        return item.place.indexOf(searchTerm) != -1;
                    });
                       
                },
                function error(response) {
                    console.log("ERROR");
                }
            );
        };
    }
//     function WonderDataDirective() {
//         var ddo = {
//             restrict: 'E',
//             templateUrl: 'wonderSelections.template.html',
//             scope: {
//                 wonderData: '<',
//                 removedOn: '&onRemove'
//             }
//         };
//         return ddo;
//     }

})();
