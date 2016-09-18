/**
 * Created by cm on 2016/9/10.
 */
angular.module('cmBadgeModule')
    .controller("cmBadgesController", ['cmBadgesService', function (badgesService) {
        var self = this;
        self.curBadge = badgesService.getBadge();
    }]);