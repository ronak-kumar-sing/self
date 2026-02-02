import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import axios from 'axios';

// Project Model (ensure matches app/models/Project.ts)
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, default: 'Web App' },
    status: { type: String, default: 'Completed' },
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    videoUrl: String,
    startDate: String,
    vercelId: { type: String, unique: true },
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function syncVercelProjects() {
    const MONGODB_URI = process.env.MONGODB_URI;
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

    if (!MONGODB_URI) throw new Error('MONGODB_URI missing');
    if (!VERCEL_TOKEN) throw new Error('VERCEL_TOKEN missing in .env.local. Please create one at https://vercel.com/account/tokens');

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    try {
        console.log('Fetching projects from Vercel...');
        const response = await axios.get('https://api.vercel.com/v9/projects', {
            headers: {
                Authorization: `Bearer ${VERCEL_TOKEN}`,
            },
        });

        const vercelProjects = response.data.projects;
        console.log(`Found ${vercelProjects.length} projects on Vercel.`);

        for (const vp of vercelProjects) {
            const title = vp.name.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

            // Construct data
            const projectData = {
                title: title,
                description: vp.description || `A project built with ${vp.framework || 'modern technologies'}.`,
                category: 'Web App',
                status: 'Completed',
                technologies: vp.framework ? [vp.framework] : [],
                liveUrl: vp.alias?.[0] ? `https://${vp.alias[0]}` : null,
                githubUrl: vp.link ? `https://github.com/${vp.link.org}/${vp.link.repo}` : null,
                startDate: new Date(vp.createdAt).toISOString().split('T')[0],
                vercelId: vp.id,
            };

            await Project.findOneAndUpdate(
                { vercelId: vp.id },
                projectData,
                { upsert: true, new: true }
            );
            console.log(`Synced: ${title}`);
        }

        console.log('Vercel sync complete!');
    } catch (error: any) {
        if (error.response) {
            console.error('Vercel API Error:', error.response.status, error.response.data);
        } else {
            console.error('Error syncing Vercel projects:', error.message);
        }
    } finally {
        process.exit(0);
    }
}

syncVercelProjects().catch(console.error);
