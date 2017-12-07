const express = require('express')
const logger = require('morgan')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

var app = express();

var {postRoutes, commentRoutes} = require('./routes/index.js');

app.set('port', process.env.PORT || 3000)
app.set('views', 'templates') // The directory the templates are stored in
app.set('view engine', 'jade')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.send({data: 'Blog API Server'})
});

app.get('/posts', postRoutes.getPosts);
app.post('/posts', postRoutes.addPost);
app.put('/posts/:postId', postRoutes.updatePost);
app.delete('/posts/:postId', postRoutes.removePost);
app.get('/posts/:postId/comments', commentRoutes.getComments);
app.post('/posts/:postId/comments', commentRoutes.addComment);
app.put('/posts/:postId/comments/:commentId', commentRoutes.updateComment);
app.delete('/posts/:postId/comments/:commentId', commentRoutes.removeComment);

app.listen(3000);