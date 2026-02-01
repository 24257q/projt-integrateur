
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, message } = body;
        const AGENCY_EMAIL = '24257@supnum.mr';

        console.log(`--- ENVOI EMAIL À : ${AGENCY_EMAIL} ---`);
        console.log('Nom:', name);
        console.log('Téléphone:', phone);
        console.log('Message:', message);
        console.log('-------------------------------------------');

        // Save to database
        const newContact = await prisma.contact.create({
            data: {
                name,
                phone,
                message,
            },
        });

        return NextResponse.json({ success: true, message: 'Informations transmises avec succès', data: newContact });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.contact.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }
}
