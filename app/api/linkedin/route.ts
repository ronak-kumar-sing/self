
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import LinkedInPost from '../../models/LinkedInPost';

export async function GET() {
    await dbConnect();
    try {
        const posts = await LinkedInPost.find({}).sort({ date: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const post = await LinkedInPost.create(body);
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

        const post = await LinkedInPost.findByIdAndUpdate(id, data, {
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

        const deletedPost = await LinkedInPost.findByIdAndDelete(id);
        if (!deletedPost) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: deletedPost });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 400 });
    }
}
