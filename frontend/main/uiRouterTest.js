/**
 * Created by cm on 2016/9/8.
 */
angular
    .module('workShop')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form', {
                url: "/form",
                templateUrl: "form.html"
            })
            //.state('form.main1', {
            //    url: "/main1",
            //    views: {
            //        main1: {templateUrl: "main1.html"},
            //        main2: {templateUrl: "main2.html"}
            //    }
            //})
            .state('form.main1', {
                url: "/main2",
                views: {
                    main1: {templateUrl: "main2.html"},
                    main2: {templateUrl: "main1.html"}
                }
            })
            .state('form.main1.main11', {
                url: "/main11",
                views: {
                    'main1@form': {templateUrl: "main2.html"},
                    'main22': {templateUrl: "form-profile.html"},
                    'cm@': {templateUrl: "form-profile.html"},
                }
            })
    })
    .controller("formController", ['$scope', function (scope) {
        scope.test = 'test';
    }])
    .controller("profileController", ['$scope', function (scope) {
        scope.test = 'test';
    }])