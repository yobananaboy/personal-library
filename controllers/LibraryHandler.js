function LibraryHandler() {
  const MONGODB_CONNECTION_STRING = process.env.DB;

  this.getAllBooks = (collection, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
      db.collection(collection)
        .find({}).toArray()
        .then(result => {
          client.close();
          res.json(result); 
        })
        .catch(err => {
          client.close();
          console.log(err);
          res.send('error getting books');
      });
    });
  };
  
  this.getBook = (collection, query, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
      db.collection(collection)
        .find(query).toArray()
        .then(result => {
          client.close();
          if(result.length >= 1) {
            res.json(result[0]);  
          } else {
            res.json('no book exists');
          }
        })
        .catch(err => {
          client.close();
          console.log(err);
          res.json('error getting book');
      });
    });
  };
  
  this.addBook = (collection, bookInfo, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
      db.collection(collection)
        .findOneAndUpdate(
          { title: bookInfo.title },
          { $set: {title: bookInfo.title, comments: bookInfo.comments, commentcount: bookInfo.commentcount} },
          { upsert: true, returnOriginal: false }
      )
      .then(result => {
        client.close();
        res.json(result.value);
      })
      .catch(err => {
        client.close();
        console.log(err);
        res.json('could not add book, please try again');
      });
    });
  };
  
  this.deleteAllBooks = (collection, query, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
        db.collection(collection).remove(query,{}, (err, result) => {
          if (err) {
            console.log(err);
            res.json('error deleting books');
          } else {
            res.json('complete delete successful');  
          }
          client.close();
        });
        
      });      
  };
  
  this.updateBook = (collection, bookData, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
      db.collection(collection)
        .findOneAndUpdate({
          _id: bookData._id
        },
        { $push: { comments: bookData.comment }, $inc: { commentcount: 1 } },
        { returnOriginal: false }
      )
      .then(result => {
        client.close();
        res.json(result.value);
      })
      .catch(err => {
        client.close();
        console.log(err);
        res.json('error updating book');
      });
    });
  };
  
  this.deleteBook = (collection, bookData, mongo, res) => {
    mongo.connect(MONGODB_CONNECTION_STRING, (err, client) => {
      const db = client.db(process.env.DB_COLLECTION);
      
      db.collection(collection).remove({_id: bookData._id},{}, (err, result) => {
          if (err) {
            console.log(err);
            res.json('error deleting books');
          } else {
            res.json('delete successful');  
          }
          client.close();
      });
    });
  };
  
}

module.exports = LibraryHandler;