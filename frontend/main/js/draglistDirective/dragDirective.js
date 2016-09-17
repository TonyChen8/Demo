/**
 * this directive is used to set an DOM element draggable.
 *
 * Created by cm on 2016/9/12.
 */


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
var is = function (obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

angular.module('cmDragDroplist')
    .directive('cmDragItem', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: {},
            require: "?^^cmDroplist",
            controller: ['$scope', function (scope) {
                scope.isDragging = false;
            }],
            compile: function (elem, attribute) {
                //check and open draggable attribute
                if (is(attribute.draggable, 'Undefined')) {
                    elem.attr('draggable', true);
                }

                return function (scope, elem, attr, ctrl) {
                    elem.bind('dragstart', function (ev) {
                        ctrl.dragstart(scope.$parent.$index);
                        scope.isDragging = true;
                    });

                    elem.bind('dragover', function (ev) {
                        if (scope.isDragging) {
                            ctrl.hideItem(scope.$parent.$index, true);
                        }
                        ctrl.dragover(ev, scope.$parent.$index);
                    });

                    elem.bind('dragend', function (ev) {
                        ctrl.dragend(ev, scope.$parent.$index);
                        scope.isDragging = false;
                    });
                }
            }
        }
    }])