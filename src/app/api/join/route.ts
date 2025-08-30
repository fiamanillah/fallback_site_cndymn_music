import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { name, country, email } = await req.json();

        if (!name || !country || !email) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const db = await getDB();
        await db.runAsync('INSERT INTO waitlist (name, country, email) VALUES (?, ?, ?)', [
            name,
            country,
            email,
        ]);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// 👇 Fixed GET handler with proper typing
export async function GET() {
    try {
        const db = await getDB();
        const rows = await db.allAsync<{
            id: number;
            name: string;
            country: string;
            email: string;
        }>('SELECT * FROM waitlist ORDER BY id DESC');

        return NextResponse.json(rows);
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
