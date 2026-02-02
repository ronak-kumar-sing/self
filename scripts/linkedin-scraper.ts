import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import puppeteer from 'puppeteer';

// LinkedIn Model
const LinkedInPostSchema = new mongoose.Schema({
    date: { type: String, required: true },
    apiId: { type: String, unique: true, sparse: true },
    topic: { type: String, default: 'Learning' },
    summary: { type: String, required: true },
    link: { type: String },
    engagement: String,
    metrics: {
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
}, { timestamps: true });

const LinkedInPost = mongoose.models.LinkedInPost || mongoose.model('LinkedInPost', LinkedInPostSchema);

async function scrapeLinkedIn() {
    const MONGODB_URI = process.env.MONGODB_URI;
    const LI_AT = process.env.LINKEDIN_LI_AT;
    const PROFILE_NAME = 'ronak-km';

    if (!MONGODB_URI || !LI_AT) {
        throw new Error('Missing MONGODB_URI or LINKEDIN_LI_AT in .env.local');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
        ],
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        // Use the exact same UA as before when it partially worked
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

        console.log('Setting LinkedIn cookie...');
        await page.setCookie({
            name: 'li_at',
            value: LI_AT,
            domain: '.www.linkedin.com',
            path: '/',
            secure: true,
            httpOnly: true
        });

        console.log('Navigating to Feed...');
        await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'networkidle2', timeout: 90000 });

        const title = await page.title();
        console.log('Current Title:', title);

        if (title.toLowerCase().includes('login') || title.toLowerCase().includes('sign in')) {
            console.error('SESSION FAILED. Title suggests login page.');
            // One last try: Activity directly
            console.log('Trying activity directly as fallback...');
        }

        const activityUrl = `https://www.linkedin.com/in/${PROFILE_NAME}/recent-activity/all/`;
        console.log(`Navigating to: ${activityUrl}`);

        await page.goto(activityUrl, { waitUntil: 'networkidle2', timeout: 120000 });
        await new Promise(r => setTimeout(r, 5000));

        console.log('Parsing posts...');
        const posts = await page.evaluate(() => {
            const items = document.querySelectorAll('.feed-shared-update-v2, .main-feed-activity-card');
            return Array.from(items).map(el => {
                const summary = el.querySelector('.update-components-text, .feed-shared-update-v2__description-wrapper')?.textContent?.trim() || '';
                const id = el.getAttribute('data-urn') || el.getAttribute('data-id') || '';
                const reactions = el.querySelector('.social-details-social-counts__reactions-count')?.textContent?.trim() || '0';

                return {
                    apiId: id,
                    summary,
                    engagement: `${reactions} reactions`,
                    date: new Date().toISOString().split('T')[0]
                };
            }).filter(p => p.summary.length > 5);
        });

        console.log(`Scraped ${posts.length} posts.`);

        for (const post of posts) {
            await LinkedInPost.findOneAndUpdate(
                { apiId: post.apiId },
                {
                    date: post.date,
                    apiId: post.apiId,
                    summary: post.summary,
                    engagement: post.engagement,
                    topic: post.summary.toLowerCase().includes('dsa') ? 'DSA' : 'Learning'
                },
                { upsert: true, new: true }
            );
        }

        console.log('LinkedIn Sync complete.');

    } catch (error: any) {
        console.error('Scraper Error:', error.message);
    } finally {
        await browser.close();
        process.exit(0);
    }
}

scrapeLinkedIn().catch(console.error);
