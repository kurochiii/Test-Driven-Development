const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    return PostModel.updatePost(req.params.id, req.body, { new: true }, function (err, update) {
        if (err) {
            return res.status(500).end();
        }
        else if (!update) {
            return res.status(404).end();
        }
        else {
            return res.json(update);
        }
    })
};

PostController.findPost = (req, res) => {
    return PostModel.findPost(req.params.id, function (err, post) {
        if (err) {
            return res.status(500).end();
        }
        else if (!post) {
            return res.status(404).end();
        }
        else {
            return res.json(post);
        }
    })
};

PostController.findAll = (req, res) => {
    return PostModel.findAll(function (err, posts) {
        if (err) {
            return res.status(500).end();
        }
        else if (!posts) {
            return res.status(404).end();
        }
        else {
            return res.json(posts);
        }
    })
};

module.exports = PostController;