
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import InstagramPost from '../../models/InstagramPost';

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const shouldSync = searchParams.get('sync') === 'true';

    try {
        if (shouldSync) {
            const token = process.env.INSTAGRAM_ACCESS_TOKEN;
            if (!token) {
                console.warn('Instagram Access Token not found');
            } else {
                try {
                    const response = await fetch(
                        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`
                    );

                    if (!response.ok) {
                        throw new Error(`Instagram API error: ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (data.data && Array.isArray(data.data)) {
                        const operations = data.data.map((item: any) => ({
                            updateOne: {
                                filter: { id: item.id },
                                update: {
                                    $set: {
                                        id: item.id,
                                        permalink: item.permalink,
                                        mediaUrl: item.media_url,
                                        thumbnailUrl: item.thumbnail_url || item.media_url,
                                        caption: item.caption || '',
                                        mediaType: item.media_type,
                                        timestamp: item.timestamp,
                                        date: new Date(item.timestamp), // Ensure date field is updated
                                        // We preserve local fields like likes/views if they exist, or init them
                                        // Note: Basic Display API doesn't give likes/views count publicly reliably without Graph API
                                    }
                                },
                                upsert: true
                            }
                        }));

                        if (operations.length > 0) {
                            await InstagramPost.bulkWrite(operations);
                        }
                    }
                } catch (apiError) {
                    console.error('Error syncing Instagram data:', apiError);
                }
            }
        }

        const posts = await InstagramPost.find({}).sort({ date: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const post = await InstagramPost.create(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const { id, ...data } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const post = await InstagramPost.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!post) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const deletedPost = await InstagramPost.findByIdAndDelete(id);
        if (!deletedPost) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: deletedPost });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 400 });
    }
}
