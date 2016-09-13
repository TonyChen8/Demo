/**
 * Created by cm on 2016/9/10.
 */
angular.module('badgesController',[])
    .controller("badgesController", ['badgesService', function (badgesService) {
        var self = this;
        self.curBadge = badgesService.getBadge();
    }]);