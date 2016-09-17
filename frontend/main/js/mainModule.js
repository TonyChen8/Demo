/**
 * Created by cm on 2016/9/4.
 */
angular.module('workShop', ['ui.router', 'ui.bootstrap', 'cmBadgeFactory', 'router', 'cmDragDroplist', "cmIcoBtn"])
    .controller('mainController', ['$scope','$http', function (scope,http) {
    scope.message = 'hello world!';
    http.post('http://localhost').success(function(res){
        scope.message = res.message;
    }).error(function (err) {
        scope.message = err;
    });
}])