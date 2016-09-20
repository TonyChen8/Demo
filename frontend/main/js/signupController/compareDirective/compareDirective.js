/**
 * Created by cm on 2016/9/20.
 */
angular.module('workShop')
    .directive('cmCompare', function () {
        return {
            strict: 'A',
            scope: {orgText: '=cmCompare'},
            require: "ngModel",
            link: function (scope, element, attr, ctrl) {
                ctrl.$validators.compare = function (v) {
                    return v == scope.orgText;
                };
                scope.$watch('orgText', function () {
                    ctrl.$validate();
                });
            }
        }
    });