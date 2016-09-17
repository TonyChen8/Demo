/**
 * this is a service UNIT TEST file
 * Created by cm on 2016/9/10.
 */

describe("A badgeService", function () {
    beforeEach(module('cmBadgeFactory'));
    //beforeEach(module('badgesService', function ($provide) {
    //    // Output messages
    //    $provide.value('$log', console);
    //}));

    it('should save a badge.', function () {
        inject(['cmBadgesService', function (badgesService) {
            var count = badgesService.getBadgeCount();
            badgesService.setBadge({name: "9", badge: "test1"});

            var badge = badgesService.getFirstBadge();
            while (badge) {
                console.log(badge.name + "  " + badge.badge);
                badge = badgesService.getNext();
            }

            badgesService.setBadge([{name:2, badge: "test2"},{name: "3", badge: "test3"},{name: 4, badge: "test4"}]);
            expect(badgesService.getBadgeCount()-count).toEqual(4);
        }])
    })
})
;

