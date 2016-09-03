/**
 * this file used to create testing data
 *
 * Created by cm on 2016/9/3.
 */
var dbControllor = require("./dbController");
var bookData = require("./bookData");

function handleError(err) {
    console.error('error: ', err);
}

// we're connected!
for (var i = 0; i < bookData.length; i++) {
    dbControllor.addNewBook(bookData[i], function (err) {
        if (err) return handleError(err);
        console.info('Add books successfully');
    });
}


