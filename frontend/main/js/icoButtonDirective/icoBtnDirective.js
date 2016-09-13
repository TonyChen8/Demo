/**
 * Created by cm on 2016/9/13.
 */
angular.module('cmIcoBtn')
    .directive("cmIcoBtn", ['cmBadgesService', function (cmBadgesService) {
        return {
            scope:{},
            transclude: true,
            templateUrl: "js/icobuttondirective/tplIcoBtn.html",
            link: function (scope, elem, attr) {
                var name = attr.cmIcoBtn || "";
                scope.badges = cmBadgesService.getBadge(name);
            }
        }
    }]);