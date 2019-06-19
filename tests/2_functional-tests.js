/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    var id;
    
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: "Test book"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, "Test book", "Book should have a title");
            assert.isArray(res.body.comments, "Comments should be array");
            assert.equal(res.body.comments.length, 0, "Comments array should be empty");
            assert.equal(res.body.commentcount, 0, "Comment count should be 0");
          
            id = res.body._id;
            done();
        });
        
      });
      
      test('Test POST /api/books with title', function(done) {
                
        chai.request(server)
          .post('/api/books')
          .send({
            title: "Second test book"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, "Second test book", "Book should have a title");
            assert.isArray(res.body.comments, "Comments should be array");
            assert.equal(res.body.comments.length, 0, "Comments array should be empty");
            assert.equal(res.body.commentcount, 0, "Comment count should be 0");
          
            done();
        });
        
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)  
          .post('/api/books')
          .send({
            title: ""
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "please provide a title", "Error message because no title supplied");
          
            done();
        });
      });
      
    });
    
    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body[0].title, "Test book", "Check the first book title is 'Test book'");
          
            done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/111111111111111111111111')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists", "Could not find book");
            
            done();  
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/' + id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id);
            assert.equal(res.body.title, "Test book");
          
            done();
        });
      });
      
    });    

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/' + id)
          .send({
            _id: id,
            comment: "Test comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.commentcount, 1);
            assert.isArray(res.body.comments);
            assert.equal(res.body.comments[0], "Test comment");
            
            done();         
        });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book with id', function() {
      
      test('Test DELETE /api/books/[id]', function(done){
        chai.request(server)
          .delete('/api/books/' + id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, 'delete successful');
          
            done();
        })
      });
      
    });
    
    suite('DELETE /api/books => delete all books', function() {
      
      test('Test DELETE /api/books', function(done){
        chai.request(server)
          .delete('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, 'complete delete successful');
          
            done();
        })
      });
      
    });
    
  });

});
