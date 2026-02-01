
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all FAQs
export async function GET(req: Request) {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

// POST create FAQ
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer, category, language } = body;

        const newFaq = await prisma.fAQ.create({
            data: {
                question,
                answer,
                category,
                language,
            },
        });
        return NextResponse.json(newFaq);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}

// DELETE FAQ
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.fAQ.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
