const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}
exports.updatePost = (postId, next) => {
    // const postId = req.params.id;
    // const updatedData = req.body;

    // Use updateOne to update the post based on its _id
    Post.updateOne({ _id: postId }, { $set: updatedData }, function (err, result) {
        next(err, result);
    });
}

exports.findPost = (postId, next) => {
    // const postId = req.params.id;
    // const updatedData = req.body;

    Post.findById({ _id: postId }, function (err, result) {
        next(err, result);
    });
}

exports.findAll = (next) => {
    // const postId = req.params.id;
    // const updatedData = req.body;

    Post.find(function (err, result) {
        next(err, result);
    });
}