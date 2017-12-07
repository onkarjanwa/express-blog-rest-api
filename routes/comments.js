var store = require('./../data/store.js');

module.exports = {
    getComments(req, res) {
        const id = req.params.postId;
        if (store.posts[id] != undefined) {
            res.send(store.posts.comments);
        } else {
            res.status(404).end();
        }
    },
    addComment(req, res) {
        const id = req.params.postId;
        if (store.posts[id] != undefined) {
            if(store.posts[id].comments === undefined) {
                store.posts[id].comments = [];
            }
            var commentId = store.posts[id].comments.length;
            store.posts[id].comments.push(req.body);
            res.send({ id: commentId });
        } else {
            res.status(404).end();
        }
    },
    updateComment(req, res) {
        const id = req.params.postId;
        const commentId = req.params.commentId;
        if (store.posts[id] != undefined && store.posts[id].comments != undefined) {
            Object.assign(store.posts[id].comments[commentId], req.body);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    },
    removeComment(req, res) {
        const id = req.params.postId;
        const commentId = req.params.commentId;
        console.log(id)
        console.log(commentId)
        console.log(store.posts[id].comments)
        if (store.posts[id] != undefined && store.posts[id].comments != undefined) {
            store.posts[id].comments.splice(commentId, 1);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
}