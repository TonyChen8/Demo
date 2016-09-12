/**
 * Created by cm on 2016/9/8.
 */
angular.module('workShop')
    .controller('testCtrl', ['$scope', function (scope) {
        scope.address = "23 inca st";
        scope.sayHello = function (data) {
            alert(' Hello ' + data.name + data.phone + data.addr);
        }
    }])
    .directive('greet', function () {
        return {
            scope: {greet: '&', phone:'@p', add:'=' },
            template: "<div class='form-group'>\
                            <label for='name' class='col-md-2 control-label'> input name</label>\
                             <div class='col-md-10'>\
                                <input type='text' class='form-control' ng-model='inputName' id='name' /> \
                         </div>\
                         </div>\
                        <input type='text' ng-model='add' />\
                        <button class='btn btn-info'ng-click='greet({name:{name:inputName,phone:phone,addr:add}})'> greeting </button> "
        }
    })