/**
 * this is a service UNIT TEST file
 * Created by cm on 2016/9/10.
 */

describe("A badgeService", function () {
    beforeEach(module('badgeFactory'));
    //beforeEach(module('badgesService', function ($provide) {
    //    // Output messages
    //    $provide.value('$log', console);
    //}));

    it('should save a badge.', function () {
        inject(['badgesService', function (badgesService) {
            expect(badgesService.getBadgeCount()).toEqual(0);
            badgesService.setBadge({name: "9", badge: "test1"});

            var badge = badgesService.getFirstBadge();
            while (badge) {
                console.log(badge.name + "  " + badge.badge);
                badge = badgesService.getNext();
            }

            expect(badgesService.getBadgeCount()).toEqual(1);
            badgesService.setBadge([{name:2, badge: "test2"},{name: "3", badge: "test3"},{name: 4, badge: "test4"}]);
            expect(badgesService.getBadgeCount()).toEqual(4);
        }])
    })
})
;

