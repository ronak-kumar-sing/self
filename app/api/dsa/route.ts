
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import DSAEntry from '../../models/DSAEntry';

export async function GET() {
    await dbConnect();
    try {
        const entries = await DSAEntry.find({}).sort({ date: -1 });
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch entries' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const entry = await DSAEntry.create(body);
        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create entry' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const { id, ...data } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const entry = await DSAEntry.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!entry) return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update entry' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const deletedEntry = await DSAEntry.findByIdAndDelete(id);
        if (!deletedEntry) return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: deletedEntry });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete entry' }, { status: 400 });
    }
}
