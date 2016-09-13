/**
 * Created by cm on 2016/9/10.
 */
angular.module('cmBadgeFactory')
    .controller("cmBadgesController", ['cmBadgesService', function (badgesService) {
        var self = this;
        self.curBadge = badgesService.getBadge();
    }]);