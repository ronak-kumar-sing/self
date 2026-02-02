
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import VideoEntry from '../../models/VideoEntry';

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const shouldSync = searchParams.get('sync') === 'true';

    try {
        if (shouldSync) {
            const apiKey = process.env.YOUTUBE_API_KEY;
            const channelId = process.env.YOUTUBE_CHANNEL_ID;

            if (!apiKey || !channelId) {
                console.warn('YouTube API Key or Channel ID not found');
            } else {
                try {
                    console.log('🔄 Syncing YouTube videos from channel:', channelId);
                    const response = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&type=video`
                    );

                    if (!response.ok) {
                        throw new Error(`YouTube API error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log(`✅ Found ${data.items?.length || 0} videos`);

                    if (data.items && Array.isArray(data.items)) {
                        const operations = data.items.map((item: any) => {
                            const videoId = item.id.videoId;
                            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
                            
                            return {
                                updateOne: {
                                    filter: { apiId: videoId },
                                    update: {
                                        $set: {
                                            apiId: videoId,
                                            title: item.snippet.title,
                                            description: item.snippet.description,
                                            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
                                            link: youtubeUrl,
                                            date: item.snippet.publishedAt,
                                            platform: 'YouTube',
                                        }
                                    },
                                    upsert: true
                                }
                            };
                        });

                        if (operations.length > 0) {
                            const result = await VideoEntry.bulkWrite(operations);
                            console.log(`📊 Upserted ${result.upsertedCount} new videos, modified ${result.modifiedCount}`);
                        }
                    }
                } catch (apiError) {
                    console.error('❌ Error syncing YouTube data:', apiError);
                }
            }
        }

        const videos = await VideoEntry.find({}).sort({ date: -1 }).lean();
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch videos' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const video = await VideoEntry.create(body);
        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create video' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const { id, ...data } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const video = await VideoEntry.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!video) return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
        return NextResponse.json(video);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update video' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const deletedVideo = await VideoEntry.findByIdAndDelete(id);
        if (!deletedVideo) return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: deletedVideo });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete video' }, { status: 400 });
    }
}
