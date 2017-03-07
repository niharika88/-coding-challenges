'use strict';

describe('Controller: View1Ctrl', function() {
    angular.module('ngRoute', []);
    angular.module('ngStorage', []);
    beforeEach(module('myApp.view1'));
    beforeEach(angular.mock.module('myApp.view1'));
    var MyController;
    var scope;
    // Initialize the controller and a mock scope.
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');
        MyController = $controller('View1Ctrl', {
            $scope: scope,
        });
        expect(MyController.$scope.genres).toBeDefined();
        expect(MyController.$scope.$storage).toBeDefined();
    }));
});