/**
 * Created by cm on 2016/9/9.
 */
angular.module('router', ["cmBadgeModule"])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/start");

        $stateProvider
            .state("root", {
                abstract: true,
                url: "",
                views: {
                    "": {
                        templateUrl: "template/base-template.html",
                    },
                    "header@root": {
                        templateUrl: "template/top-header.html",
                        controller: "cmBadgesController as badges"
                    },
                    "menu-sidebar@root": {
                        templateUrl: "template/left-menu-bar.html"
                    }
                }
            })
            .state("root.start", {
                url: "/start",
                views: {
                    "main-view@root": {
                        templateUrl: "template/mid-main-view.html"
                    }
                }
            })
            .state("signup", {
                url: "/signup/:login",
                templateUrl: "template/login.html",
                //controller: "signupController as SC"
            })
    }])
