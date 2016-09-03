/**
 * CRUD, database's operation.
 *
 * Created by cm on 2016/9/3.
 */
var mongoose = require('mongoose');
var bookObj = require("./bookModel");
var logger = require("../logSystem/logger");

var bookSchema = bookObj.bookSchema;
var bookModel = bookObj.bookModel;
var dbAddress = 'mongodb://localhost:27017/BookStores';

//connect to database
!function openDatabase() {
    //connect to db
    mongoose.connect(dbAddress);

    //handle error. other message like: connected, disconnected and  process.on('SIGINT', function)
    mongoose.connection.on('error', function () {
        logger.error('Mongoose error');
    });
}();

/**
 * test a object's type
 *
 * @param strType a string. it is a type you want to test like Array, String and so on
 * @param o object te be tested.
 * @returns {boolean} true if strType is the object type
 */
var is = function (strType, o) {
    return Object.prototype.toString.call(o) === '[object ' + strType + ']';
};

/**
 *  combine two or more objects or arrays, need to ensure the objects's structure are same
 *
 *  example:
 *  var test = {a: 2, b: '7', c: {d: 5, e: [4, {f:9, g:'kk'}]}};
 *  var test1 = {a: 1, c: {d:8}};    //ok
 *  var test2 = { e: [8, {f:0 }]};  //this structure is different from the test,so it will not combine to test.
 *
 *  extend(test, test1, test2);  //{ a: 1, b: '7', c: { d: 8, e: [ 4, {f:9, g:'kk'} ] } }
 */
function extend() {
    var dest = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var src = arguments[i];
        if (is('Array', src) && is('Array', dest)) {
            for (var index in src) {
                if (typeof src[index] === 'object' && 'object' === typeof dest[index]) {
                    extend(dest[index], src[index]);
                } else {
                    dest[index] = src[index];
                }
            }
            continue;
        }
        if (is('Object', src) && is('Object', dest)) {
            for (var key in src) {
                if (dest.hasOwnProperty(key) && src.hasOwnProperty(key)) {
                    if (typeof src[key] === 'object' && 'object' === typeof dest[key]) {
                        extend(dest[key], src[key]);
                    }
                    else {
                        dest[key] = src[key];
                    }
                }
            }
        }
    }
}

function check(callback) {
    if (!callback || typeof callback !== 'function') {
        //TODO: handle the error
        console.error('db controller meet an Error. Callback function should not be null!');
        throw new Error('Callback function should not be null!');
    }
}

// before save data, we can do something here
bookSchema.pre('save', function (next) {
    // set create date and update date
    var currentDate = new Date();
    this.updated_at = currentDate;
    // only save the create date
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

/**
 * export a set of database control functions
 *
 * @type {{
 * addNewBook: dbControllor.addNewBook,
 * findAllBooks: dbControllor.findAllBooks,
 * findBook: dbControllor.findBook,
 * updateBook: dbControllor.updateBook,
 * deleteBook: dbControllor.deleteBook
 * }}
 */
var dbControllor = {
    /**
     * add a new book
     * @param bookData book data
     * @param callback
     */
    addNewBook: function (bookData, callback) {
        check(callback);
        var aBook = new bookModel(bookData);
        aBook.save(callback);
    },
    /**
     * find all of books in database
     *
     * @param callback
     */
    findAllBooks: function (callback) {
        check(callback);
        bookModel.find({}, callback);
    },
    /**
     * find a special book indicated by bookData
     *
     * @param bookData book information
     * @param callback
     */
    findBook: function (bookData, callback) {
        check(callback);
        bookModel.find(bookData, fcallback);
    },
    /**
     * test only
     */
    myQuery: function () {
        // this is a test to find the data created a month ago.
        var monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        User.find({}).where('created_at').gt(monthAgo).exec(function (err, users) {
            if (err) return handleError(err);

            // show the admins in the past month
            logger.info(users);
        });
    },
    /**
     * update the data of the first book that we found.
     *
     * @param condition used to find the book.
     * @param newBookData new data
     * @param callback function to sendback data.
     */
    updateBook: function (condition, newBookData, callback) {
        check(callback);
        bookModel.findOne(condition, function (err, book) {
            if (err) throw new Error('cannot find this book: ' + condition);
            extend(book, newBookData);
            book.save(callback);
        });
    },
    /**
     * delete a book from DB
     *
     * @param condition define a book such as book id {id:2} or name {name:xxxx}
     * @param callback function to sendback data.
     */
    deleteBook: function (condition, callback) {
        check(callback);
        bookModel.findOne(condition, function (err, book) {
            if (err) throw new Error('cannot find this book: ' + condition);
            book.remove(callback);
        })
    }

};

module.exports = dbControllor;

