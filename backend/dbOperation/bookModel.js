/**
 * this is database documents' structure
 *
 * Created by cm on 2016/9/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema
var bSchema = new Schema({
    title: {type: String, required: true},                   //title
    author: {type: String, required: true},                  //author
    imgs: String,                                               //book image
    Format: String,                                             //books' page size
    Dimensions: String,                                        //books's xxxxx
    "Publication date": {type: Date, default: new Date},   //issue date
    Publisher: String,                                         //books's xxxxx
    Publication: String,                                       //books's xxxxx
    Language: String,                                          //books's xxxxx
    ISBN10: String,                                            //books's xxxxx
    ISBN13: String,                                            //books's xxxxx
    rating: {                                                  //books's rating
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 3
    },
    price: Number,                                              //price
    orgPrice: Number,                                          //old price
    brief: String,                                             //description
    updated_at: Date,                                         //update time
    created_at: Date                                          //creation time
});

// before save data, we can do something here
bSchema.pre('save', function (next) {
    // set create date and update date
    var currentDate = new Date();
    this.updated_at = currentDate;
    // only save the create date
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create book model
var bModel = mongoose.model('books', bSchema);

var bookObj = {
    bookSchema: bSchema,
    bookModel: bModel
};

// export book model
module.exports = bookObj;
