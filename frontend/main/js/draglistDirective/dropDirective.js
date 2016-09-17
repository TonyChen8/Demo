/**
 * this directive allow an element receive a draggable element.
 *
 * Created by cm on 2016/9/14.
 */
angular.module('cmDragDroplist')
    .directive('cmDroplist', ['$parse', '$document', function ($parse, $document) {
        return {
            restrict: 'A',
            scope: {},
            controllerAs: 'myController',
            controller: ['$scope', '$element', function ($scope, $element) {
                var self = this;
                self.isDragging = false;
                self.posArray = []; //children's positions
                var parentCtrl = $scope.$parent.dlc;

                self.dragstart = function (index) {
                    self.isDragging = true;
                    parentCtrl.dragstart($scope.$parent.$index, index);
                };
                self.dragover = function (ev) {
                    self.isDragging = true;
                    parentCtrl.dragover($scope.$parent.$index, self.getInsertPosition(ev), self.calculateItemPos);
                };
                self.dragend = function (ev, index) {
                    parentCtrl.clearStatus();
                    parentCtrl.dragend($scope.$parent.$index, index);
                    self.isDragging = false;
                };
                self.hideItem = function (index, hide) {
                    parentCtrl.hideItem($scope.$parent.$index, index, hide);
                };
                self.repeatFinished = function () {
                    self.calculateItemPos();
                };

                self.getInsertPosition = function (ev) {
                    //calculate gap position
                    var i = 0;
                    for (; i < self.posArray.length; i++) {
                        if (self.posArray[i] > ev.clientY) {
                            break;
                        }
                    }
                    return i;
                };

                //calculate the pos of all droplist items.
                self.calculateItemPos = function () {
                    //find all children with cmDroplistElem class
                    var elemArry = $element[0].getElementsByClassName("cm-droplist-elem");

                    self.posArray = []; //clear

                    for (var i = 0; i < elemArry.length; i++) {
                        var val = elemArry[i].getBoundingClientRect();
                        self.posArray.push((val.bottom + val.top) / 2);
                    }
                };
            }],
            link: function (scope, elem, attr) {
                elem.bind('scroll', function () {
                    //if scroll we need to refresh the position of items
                    if (scope.myController.isDragging) {
                        scope.myController.calculateItemPos()
                    }
                });
                elem.bind('dragover', function (ev) {
                    ev.preventDefault();
                    scope.myController.dragover(ev);
                });
                elem.bind('dragleave', function (ev) {
                    scope.myController.isDragging = false;
                });
                elem.bind('dragenter', function (ev) {
                    scope.myController.isDragging = true;
                });
            }
        }
    }])
    .directive("cmDroplistElem", ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return {
            restrict: 'C',
            require: "?^^cmDroplist",
            link: function (scope, elem, attr, ctrl) {
                if (!ctrl) return;

                //if this is the last one, tell father I am finished
                if (scope.$last === true) {
                    ctrl.repeatFinished();
                }
            }
        }
    }])
    .filter("checkmark", function () {
        return function (input) {
            return input ? input : null;
        }
    });

