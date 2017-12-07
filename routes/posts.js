var store = require('./../data/store.js');

module.exports = {
    getPosts(req, res) {
        res.send(store);
    },
    addPost(req, res) {
        var id = store.posts.length;
        store.posts.push(req.body);
        res.send({ id: id });
    },
    updatePost(req, res) {
        var id = req.params.postId;
        if (store.posts[id] != undefined) {
            Object.assign(store.posts[id], req.body);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    },
    removePost(req, res) {
        var id = req.params.postId;
        if (store.posts[id] != undefined) {
            store.posts.splice(id, 1);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }
}