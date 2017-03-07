'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngStorage'])

/**
 * Description
 * @method routeProvider
 * @param {} routeProvider
 * @param {} 
 * @return routes to view templates
 */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    $scope.genres = [];
    $scope.quantity = 4;
    $scope.$storage = $localStorage.$default({
        selected_genres: [],
        selected_genres_names: []
    });

    $http.get('view1/genres.json')
        .success(function(data) {
            $scope.genres = data;
        })
        .error(function() {
            defer.reject('could not find genres.json');
        });

    /**
     * Description
     * @method changeValue
     * @param {} selected_genre
     * @return array of selected genres {names, id}
     */
    $scope.changeValue = function(selected_genre) {
        var i = $scope.$storage.selected_genres.indexOf(selected_genre.id);
        if (i != -1) {
            $scope.$storage.selected_genres.splice(i, 1);
            $scope.$storage.selected_genres_names.splice(i, 1);
        } else {
            $scope.$storage.selected_genres.push(selected_genre.id);
            $scope.$storage.selected_genres_names.push(selected_genre.name);
        }
    }

    /**
     * Description
     * @method save_preference
     * @return result if callback is success or failure message
     */
    $scope.savePreference = function() {
        $http.defaults.headers.common.Authorization = '1234-5678-9999-9999'
        $http({
            method: 'POST',
            url: '/https://api.example.com/preferences',
            data: $scope.selected_genres,
        }).then(function successCallback(response) {

            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $scope.successTextAlert = "preferences saved: In error callback of ficticious api";
            $scope.showSuccessAlert = true;
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

}]);