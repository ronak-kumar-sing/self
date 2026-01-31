import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    longDescription: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Web App', 'Mobile App', 'API', 'CLI Tool', 'Library', 'AI/ML', 'DevOps', 'Other'],
    },
    status: {
        type: String,
        required: true,
        enum: ['In Progress', 'Completed', 'Maintained', 'Archived'],
        default: 'In Progress',
    },
    technologies: [{
        type: String,
        trim: true,
    }],
    features: [{
        type: String,
    }],
    githubUrl: {
        type: String,
        trim: true,
    },
    liveUrl: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    startDate: {
        type: String,
        required: [true, 'Please provide a start date'],
    },
    endDate: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
