import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import Project from '../../models/Project';

export async function GET() {
    await dbConnect();
    try {
        const projects = await Project.find({}).sort({ featured: -1, order: 1, startDate: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const { id, ...data } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const project = await Project.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!project) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: deletedProject });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 400 });
    }
}
