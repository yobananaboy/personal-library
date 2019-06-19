/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const collection = 'books';
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

var LibraryHandler = require('../controllers/LibraryHandler.js');

module.exports = function (app) {

  var libraryHandler = new LibraryHandler();
  
  app.route('/api/books')
    .get(function (req, res){
      libraryHandler.getAllBooks(collection, MongoClient, res);
    })
    
    .post(function (req, res){
      var title = req.body.title;
      if(title && title.length >= 1) {
        libraryHandler.addBook(collection, {title, comments: [], commentcount: 0}, MongoClient, res);
      } else {
        res.json("please provide a title");
      }
    })
    
    .delete(function(req, res){
      libraryHandler.deleteAllBooks(collection, {}, MongoClient, res);
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      try {
        bookid = ObjectId(bookid);
        libraryHandler.getBook(collection, {_id: bookid}, MongoClient, res);  
      }
      catch(err) {
        res.json('no book exists');
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      try {
        bookid = ObjectId(bookid);
        var comment = req.body.comment;
        libraryHandler.updateBook(collection, {_id: bookid, comment}, MongoClient, res);
      }
      catch(err) {
        res.json('no book exists');
      }
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      try {
        bookid = ObjectId(bookid);
        libraryHandler.deleteBook(collection, {_id: bookid}, MongoClient, res);  
      }
      catch(err) {
        res.json('no book exists');
      }
      
      //if successful response will be 'delete successful'
    });
  
};
