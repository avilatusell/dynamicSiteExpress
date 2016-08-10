var express = require('express');
var app = express();
 
var hbs = require('hbs');

var blogEngine = require('./blog');
 
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.bodyParser());
app.use(express.static('public'));

 
app.get('/', function(req, res) {
	var blogEntries = blogEngine.getBlogEntries();
	var oRenderConfig = {
    	title: "My Blog", 
    	entries: blogEntries
    };
    res.render('home', oRenderConfig );
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});
 
app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);

