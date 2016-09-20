/**
 * Created by cm on 2016/9/20.
 */
angular.module('workShop')
    .controller('signupController', ['$scope','$stateParams', function ($scope,$stateparams) {
        var self = this;
        self.login = ($stateparams.login == 'login'?true:false);
        self.username = "";
        self.password = "";
        self.passwordConfirm = "";

        self.submitForm = function () {
            console.log("form:" + self.username + "," + self.password + "," + self.passwordConfirm);
            if(self.login){
                if ($scope.loginForm.$valid) {
                    alert('success');
                } else {
                    alert('failed');
                }
            }else {
                if ($scope.registerForm.$valid) {
                    alert('success');
                } else {
                    alert('failed');
                }
            }
        }
    }]);