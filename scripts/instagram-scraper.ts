import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { IgApiClient } from 'instagram-private-api';
import mongoose from 'mongoose';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Define Mongoose Schema directly to avoid import issues with Next.js environment
const InstagramPostSchema = new mongoose.Schema({
    date: String,
    apiId: { type: String, unique: true, sparse: true },
    type: String,
    caption: String,
    link: String,
    views: Number,
    likes: Number,
    comments: Number,
    topic: String,
    media_url: String,
    thumbnail_url: String,
}, { timestamps: true });

const InstagramPost = mongoose.models.InstagramPost || mongoose.model('InstagramPost', InstagramPostSchema);

async function saveSession(ig: IgApiClient) {
    const serialized = await ig.state.serialize();
    delete serialized.constants; // reducing size
    writeFileSync(join(process.cwd(), 'session.json'), JSON.stringify(serialized));
}

async function loadSession(ig: IgApiClient) {
    const path = join(process.cwd(), 'session.json');
    if (existsSync(path)) {
        const serialized = JSON.parse(readFileSync(path, 'utf8'));
        await ig.state.deserialize(serialized);
        return true;
    }
    return false;
}

async function scrape() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error('MONGODB_URI missing');
    if (!process.env.IG_SESSIONID && (!process.env.IG_USERNAME || !process.env.IG_PASSWORD)) {
        throw new Error('IG Credentials missing. Please provide IG_SESSIONID or IG_USERNAME and IG_PASSWORD.');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME || 'instagram_scraper');

    let loggedIn = false;

    // METHOD 1: Use Session Cookie (Most reliable)
    if (process.env.IG_SESSIONID) {
        console.log('Using IG_SESSIONID from environment...');
        await ig.state.deserializeCookieJar(JSON.stringify({
            cookies: [{
                key: 'sessionid',
                value: process.env.IG_SESSIONID,
                domain: 'instagram.com',
                path: '/',
                secure: true,
                httpOnly: true,
                hostOnly: false,
                creation: new Date().toISOString(),
                lastAccessed: new Date().toISOString()
            }]
        }));
        try {
            const user = await ig.account.currentUser();
            console.log(`Successfully authenticated as ${user.username} via cookie!`);
            loggedIn = true;
        } catch (e) {
            console.log('Session cookie expired or invalid.');
        }
    }

    // METHOD 2: Use saved session file
    if (!loggedIn && await loadSession(ig)) {
        console.log('Loaded credentials from local session.json');
        try {
            await ig.account.currentUser();
            loggedIn = true;
        } catch (e) {
            console.log('Local session file expired.');
        }
    }

    // METHOD 3: Username/Password + 2FA (Fallback)
    if (!loggedIn && process.env.IG_USERNAME && process.env.IG_PASSWORD) {
        console.log(`Logging in as ${process.env.IG_USERNAME}...`);
        const username = process.env.IG_USERNAME!;
        const password = process.env.IG_PASSWORD!;

        try {
            await ig.account.login(username, password);
        } catch (e: any) {
            if (e.name === 'IgLoginTwoFactorRequiredError' || (e.response && e.response.body && e.response.body.two_factor_info)) {
                const twoFactorInfo = e.response.body.two_factor_info || e.response.body;
                const { two_factor_identifier, verification_method } = twoFactorInfo;
                console.log(`2FA Required. Method: ${verification_method}`);

                const readline = await import('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                const code = await new Promise<string>((resolve) => {
                    rl.question('Enter the 2FA code sent to your phone: ', (answer) => {
                        rl.close();
                        resolve(answer);
                    });
                });

                await ig.account.twoFactorLogin({
                    username,
                    verificationCode: code,
                    twoFactorIdentifier: two_factor_identifier,
                    verificationMethod: verification_method,
                    trustThisDevice: '1',
                });
            } else {
                throw e;
            }
        }
        await saveSession(ig);
        console.log('Login successful & session saved');
    }

    if (!loggedIn) {
        throw new Error('Could not authenticate. Please provide IG_SESSIONID or working credentials.');
    }

    let userId: string | number;
    if (process.env.IG_USERNAME) {
        userId = await ig.user.getIdByUsername(process.env.IG_USERNAME);
    } else {
        const currentUser = await ig.account.currentUser();
        userId = currentUser.pk;
    }
    const userFeed = ig.feed.user(userId);

    console.log('Fetching feed...');
    let items = [];
    // Fetch first 2 pages
    items = await userFeed.items();
    if (userFeed.isMoreAvailable()) {
        const moreItems = await userFeed.items();
        items = items.concat(moreItems);
    }

    console.log(`Found ${items.length} items. syncing...`);

    for (const itemObj of items) {
        const item = itemObj as any;
        // Extract metrics
        let type = 'Post';
        if (item.media_type === 2 && item.product_type === 'clips') type = 'Reel';
        else if (item.media_type === 8) type = 'Carousel';

        const views = item.play_count || item.view_count || 0;
        const likes = item.like_count || 0;
        const comments = item.comment_count || 0;
        const caption = item.caption ? item.caption.text : '';
        const link = `https://www.instagram.com/p/${item.code}/`;
        const date = new Date(item.taken_at * 1000).toISOString();

        // Auto-tagging logic based on caption
        let topic = 'General';
        const lowerCap = caption.toLowerCase();
        if (lowerCap.includes('dsa') || lowerCap.includes('leetcode')) topic = 'DSA';
        else if (lowerCap.includes('project') || lowerCap.includes('build')) topic = 'Building';
        else if (lowerCap.includes('system design')) topic = 'System Design';
        else if (lowerCap.includes('life') || lowerCap.includes('journey')) topic = 'Lifestyle';

        await InstagramPost.findOneAndUpdate(
            { apiId: item.id },
            {
                date,
                apiId: item.id,
                type,
                caption,
                link,
                views,
                likes,
                comments,
                topic,
                // Thumbnails logic could be complex, skipping exact URL extraction for now or using first candidate
                thumbnail_url: item.image_versions2?.candidates?.[0]?.url
            },
            { upsert: true, new: true }
        );
    }

    console.log('Sync complete.');
    process.exit(0);
}

scrape().catch(e => {
    console.error(e);
    process.exit(1);
});
