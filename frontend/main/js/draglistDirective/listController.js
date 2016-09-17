/**
 * Created by cm on 2016/9/12.
 */
angular.module('cmDragDroplist')
    .controller('cmDragDroplistController', ['$scope', function ($scope) {
        var self = this;
        self.draggingItem = {};
        self.insertPos = {};
        Object.defineProperty(self.insertPos, "listIndex", {
            set: function (newValue) {
                this._listIndex = newValue;
            },
            get: function () {
                return this._listIndex;
            }
        });

        //data model
        self.lists = [
            {
                message: "message",
                items: [{task: "i am a task 1"}, {task: "i am a task 2 "}, {task: "i am a task 3"}, {task: "i am a task 4"}]
            },
            {
                message: "today",
                items: [{
                    task: "i am a task 5",
                    insertHere: true
                }, {task: "i am a task 6"}, {task: "i am a task 7"}, {task: "i am a task 8"}]
            },
            {
                message: "tomorrow",
                items: [{task: "i am a task 9"}, {task: "i am a task 10"}, {task: "i am a task 11"}, {task: "i am a task 12"}]
            },
            {
                message: "todo",
                items: [{task: "i am a task 13"}, {task: "i am a task 14"}, {task: "i am a task 15"}, {task: "i am a task 16"}]
            }
        ];

        self.clearStatus = function () {
            self.lists.forEach(function (ele, index, array) {
                ele.items.forEach(function (ele, index, array) {
                    ele.insertHere = false;
                    ele.insertAfter = false;
                })
            });
        };

        self.dragstart = function (list, pos) {
            //self.draggingItem.val = self.lists[list].items[pos];
            self.draggingItem.listIndex = list;
            self.draggingItem.itemIndex = pos;
        };

        self.dragover = function (list, pos, callback) {
            console.log(self.draggingItem);
            if (list !== self.insertPos.listIndex || pos !== self.insertPos.itemIndex) {
                self.insertPos.listIndex = list;
                self.insertPos.itemIndex = pos;

                self.clearStatus();

                var length = self.lists[list].items.length;
                if (pos >= length) { // for the last item
                    if (length <= 0)return;
                    $scope.$apply(self.lists[list].items[length - 1].insertAfter = true);
                } else {
                    $scope.$apply(self.lists[list].items[pos].insertHere = true);
                }
                if (callback) {
                    callback();
                }
            }

        };

        //end drag
        self.dragend = function (list, pos) {
            var val = self.lists[list].items[pos];

            if (!val) {
                console.log('on dragend: cannot find the item of [' + list + "," + pos + "].");
                return;
            }

            self.hideItem(list, pos, false);
            self.removeItem(list, pos);
            if (self.insertPos.listIndex == list) {
                //the same list
                if (pos < self.insertPos.itemIndex) {
                    self.insertPos.itemIndex--;
                }
            }
            self.insertItem(val);
            self.draggingItem = {};
            self.insertPos = {};
        };

        //hide an item
        self.hideItem = function (list, pos, hide) {
            //should invoke after dragstart
            $scope.$apply(self.lists[list].items[pos].hide = hide);
        };

        //remove an item
        self.removeItem = function (list, index) {
            self.lists[list].items.splice(index, 1);
        };

        //insert an Item
        self.insertItem = function (draggingItem) {
            self.lists[self.insertPos.listIndex].items.splice(self.insertPos.itemIndex, 0, draggingItem);
            $scope.$apply();
        };
    }]);