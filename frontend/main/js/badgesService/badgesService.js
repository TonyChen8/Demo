angular.module('cmBadgeFactory')
    .provider("cmBadgesService", function () {
        var self = this;
        var badges = [];
        var tmpIndex = []; //for iterator
        var iterator = 0;
        var curBadge='dashboard';
        badges['dashboard'] = {name:'Dashboard', badge: "glyphicon glyphicon-th"};
        badges['plusSign'] = {name: 'plusSign', badge: "glyphicon glyphicon-plus-sign"};
        badges['message'] = {name: 'message', badge: "glyphicon glyphicon-envelope"};

        function log() {
            if (badges.length) {
                $log.log('batchLog messages: ', badges);
            }
        }

        self.isValid = function (obj) {
            return obj !== null && typeof obj !== 'undefined';
        };
        /**
         * function to check an object's data type
         * example:
         *      if(is('Array',[])) { do something } //return true
         *      if(is('array',[])) { do something } //return false case sensitive
         *
         * @param type, expected type
         * @param obj the object that to be checked
         * @returns {boolean} true if the type is equal
         */
        self.is = function (type, obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        };
        return {
            setCurBadges: function (newBadges) {
                curBadge = newBadges;
            },
            $get: function () {
                return {
                    /**
                     * get a badge from service
                     *
                     * @param badgeName
                     * @returns {*}
                     */
                    getBadge: function (badgeName) {
                        var badge = badgeName || curBadge;
                        return badges[badge];
                    },
                    /**
                     * save a badge into service
                     *
                     * @param badge a json obj {name:xx, badge:xx}
                     *         or a json array: [{name:xx, badge:xx},{name:xx, badge:xx},...]
                     */
                    setBadge: function (badge) {
                        var tmpBadge = badge || [];
                        if (self.is('Array', tmpBadge)) {
                            for (var i = 0; i < tmpBadge.length; i++) {
                                this.setBadge(tmpBadge[i]);
                            }
                            return;
                        }
                        if (self.isValid(tmpBadge.name)) {
                            badges[tmpBadge.name] = tmpBadge;
                        }
                    },
                    /**
                     * get badge number
                     * @returns {Number} badge number
                     */
                    getBadgeCount: function () {
                        var index = 0;
                        //if badge's name is number, array length may not indicate the number of the elements, some of them are empty.
                        for (var obj in badges) {
                            index++;
                        }
                        return index;
                    },
                    /**
                     * get next badge,iterator will indicate the badge position of the array
                     * @returns {*}
                     */
                    getNext: function () {
                        ++iterator;
                        if (iterator >= badges.length) {
                            return null;
                        }
                        else {
                            return badges[tmpIndex[iterator]];
                        }
                    },
                    /**
                     * get previous badge
                     * @returns {*}
                     */
                    getPrevious: function () {
                        --iterator;
                        iterator = (iterator < 0 ? 0 : iterator);
                        return badges[tmpIndex[iterator]];
                    },
                    /**
                     * reset iterator to 0
                     */
                    resetIterator: function () {
                        iterator = 0;
                        tmpIndex = [];
                    },
                    /**
                     * for iterator the badges. starting from the first one
                     * for example:
                     *             var badge = badgesService.getFirstBadge();
                     *             while (badge) {
                     *                  console.log(badge.name + "  " + badge.badge);
                     *                  badge = badgesService.getNext();
                     *             }
                     *
                     * @returns {*} return the first badge.
                     */
                    getFirstBadge: function () {
                        this.resetIterator();
                        var index = 0;
                        for (var obj in badges) {
                            tmpIndex[index++] = obj;
                        }
                        return badges[tmpIndex[iterator]];
                    }
                }
            }
        }
    })
