const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");

const wikiSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", wikiSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.route("/articles")
.get( function(req, res) {
  Article.find({}, function(err, result) {
    if (!err) {
      res.send(result);
    }
  });
})
.post( function(req, res) {
  const postArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  postArticle.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Saved successfully");
    }
  });
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if (!err){
      res.send("Deleted successfully");
    }
  });
});
app.route("/Articles/:ArticleTitle")
.get(function(req,res){
  Article.findOne({title:req.params.ArticleTitle},function(err,foundDoc){
    if(err){
      res.send(err);
    }else{
      res.send(foundDoc);
    };
  });
})
.put(function(req,res){
  Article.update({title : req.params.ArticleTitle}, {title : req.body.title,content : req.body.content},function(err){
    if(err){
      res.send("could not update");
    }else{
      res.send("Updated Successfully");
    }
  });
})
.patch(function(req,res){
  Article.update({title:req.params.ArticleTitle} ,{$set : req.body},function(err){
    if (err){
      res.send("Could not update"+ err);
    }else{
      res.send("Updated successfully");
    }
  });
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.ArticleTitle},function(err){
    if (err){
      res.send("Could not delete :"+ err);
    }else{
      res.send("deleted successfully");
    }
  });
});
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
