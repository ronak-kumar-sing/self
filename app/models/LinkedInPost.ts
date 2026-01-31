import mongoose from 'mongoose';

const LinkedInPostSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    apiId: {
        type: String, // LinkedIn Share URN
        unique: true,
        sparse: true,
    },
    topic: {
        type: String,
        enum: ['Learning', 'DSA', 'Career', 'Project', 'Tech', 'Personal'],
        default: 'Learning',
    },
    summary: {
        type: String,
        required: [true, 'Please provide a summary'],
    },
    link: {
        type: String,
        trim: true,
    },
    engagement: {
        type: String, // Keep as string for now as per current UI, or move to numeric metrics later
    },
    metrics: {
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        impressions: { type: Number, default: 0 },
    },
}, {
    timestamps: true,
});

export default mongoose.models.LinkedInPost || mongoose.model('LinkedInPost', LinkedInPostSchema);
