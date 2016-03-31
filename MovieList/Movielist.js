var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/bollywood';

app.use(express.urlencoded());


app.get('/',function(req,res){
	
	console.log("Got a GET request for the homepage");
	res.send('Hello GET');
});

app.get('/about',function(req,res){
	res.sendfile('./views/index.html');
	
}); 
app.get('/movielist',function(req,res){
	
	console.log("connecting");
	
	MongoClient.connect(url, function(err, db) {
		 // assert.equal(null, err);
		  db.collection('movielist').find().toArray(function(err,docs){
			 res.send(docs);
			 db.close();
		 });
	});			  			
}); 


var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s",host,port);
	
});

app.get('/movie/:movie_id',function(req,res){
	
	//res.send(req.params.id);
	
	MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  db.collection('movielist').findOne({movie_id:parseInt(req.params.movie_id)},function(err,docs){
			 res.locals.docs = docs;
			 res.render("index");
		  });
	});	
});  