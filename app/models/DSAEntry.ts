import mongoose from 'mongoose';

const DSASchema = new mongoose.Schema({
    problemName: {
        type: String,
        required: [true, 'Please provide a problem name'],
        trim: true,
    },
    platform: {
        type: String,
        required: [true, 'Please provide a platform'],
        enum: ['LeetCode', 'CodeForces', 'HackerRank', 'GeeksforGeeks', 'Other'],
    },
    difficulty: {
        type: String,
        required: [true, 'Please provide a difficulty'],
        enum: ['Easy', 'Medium', 'Hard'],
    },
    topic: {
        type: String,
        trim: true,
    },
    notes: {
        type: String,
    },
    link: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        required: [true, 'Please provide a date'],
    },
}, {
    timestamps: true,
});

export default mongoose.models.DSAEntry || mongoose.model('DSAEntry', DSASchema);
