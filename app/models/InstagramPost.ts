import mongoose from 'mongoose';

const InstagramPostSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    apiId: {
        type: String, // Store the Instagram Media ID
        unique: true,
        sparse: true,
    },
    caption: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Reel', 'Post', 'Story', 'Carousel'],
        default: 'Reel',
    },
    topic: {
        type: String,
        trim: true,
    },
    media_url: {
        type: String,
    },
    permalink: {
        type: String,
    },
    thumbnail_url: {
        type: String,
    },
    link: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.models.InstagramPost || mongoose.model('InstagramPost', InstagramPostSchema);
