const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true
        },
        Date: {
            type: Date,
            default: Date.now,
        },
        likes: [{
            user: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }],
        replies: [{
            text: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                required: true
            },
            Date: {
                type: Date,
                default: Date.now,
            },
            likes: [{
                user: {
                    type: Schema.Types.ObjectId,
                    required: true
                }
            }]
        }]
    }],
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }],
    Date: {
        type: Date,
        default: Date.now,
    },
})

let Post = new mongoose.model('Post', PostSchema);

module.exports = Post;