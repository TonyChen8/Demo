/**
 * Created by cm on 2016/9/9.
 */
angular.module('router',[])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/start");

        $stateProvider
            .state("root", {
                abstract: true,
                url: "",
                views: {
                    "header": {
                        templateUrl: "template/top-header.html",
                        controller: "badgesController as badges"
                    },
                    "menu-sidebar": {
                        templateUrl: "template/left-menu-bar.html"
                    }
                }
            })
            .state("root.start", {
                url: "/start",
                views: {
                    "main-view@": {
                        templateUrl: "template/mid-main-view.html",
                    }
                }
            })
    }])
    .controller("formController", ['$scope', function (scope) {
        scope.test = 'test';
    }]);
