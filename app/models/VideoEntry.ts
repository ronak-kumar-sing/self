import mongoose from 'mongoose';

const VideoEntrySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    apiId: {
        type: String, // YouTube Video ID
        unique: true,
        sparse: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
    },
    platform: {
        type: String,
        required: true,
        enum: ['YouTube', 'Instagram', 'LinkedIn', 'Other'],
        default: 'YouTube',
    },
    thumbnail: {
        type: String,
    },
    link: {
        type: String,
        trim: true,
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

export default mongoose.models.VideoEntry || mongoose.model('VideoEntry', VideoEntrySchema);
