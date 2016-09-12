/**
 * Created by cm on 2016/9/4.
 */
angular.module('workShop',['ui.router','ui.bootstrap','badgeFactory','badgesController','router'])
    .controller('mainController', ['$scope','$http', function (scope,http) {
    scope.message = 'hello world!';
    http.post('http://localhost').success(function(res){
        scope.message = res.message;
    }).error(function (err) {
        scope.message = err;
    });
}])