const posts = require('./posts.js');
const comments = require('./comments.js');

var routes = {};
routes.postRoutes = posts;
routes.commentRoutes = comments;
module.exports = routes;