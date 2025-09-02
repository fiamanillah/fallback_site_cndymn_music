import { NextResponse } from 'next/server';
import { connectDB, Waitlist } from '@/lib/db';
import mongoose from 'mongoose';

// Define a type for Mongo duplicate key error
interface MongoServerError extends Error {
    code?: number;
    keyPattern?: Record<string, unknown>;
    keyValue?: Record<string, unknown>;
}

export async function POST(req: Request) {
    try {
        console.log('POST /api/join - Starting request');

        // Connect to database
        await connectDB();
        console.log('Database connected');

        const body = await req.json();
        console.log('Request body:', body);

        const { name, country, email } = body as {
            name?: string;
            country?: string;
            email?: string;
        };

        // Validate required fields
        if (!name || !country || !email) {
            console.log('Validation failed: missing fields');
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Basic email validation
        // You can add more complex email validation if needed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Validation failed: invalid email format');
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        console.log('Creating new waitlist entry...');

        // Create new waitlist entry
        const newEntry = new Waitlist({
            name: name.trim(),
            country: country.trim(),
            email: email.trim().toLowerCase(),
        });

        const savedEntry = await newEntry.save();
        console.log('Entry saved successfully:', savedEntry._id);

        return NextResponse.json({
            success: true,
            message: 'Successfully added to waitlist',
            id: savedEntry._id,
        });
    } catch (err: unknown) {
        console.error('POST /api/join error:', err);

        // Handle duplicate email error (MongoDB error code 11000)
        if (err instanceof Error && (err as MongoServerError).code === 11000) {
            console.log('Duplicate email error');
            return NextResponse.json(
                { error: 'Email already exists in waitlist' },
                { status: 409 }
            );
        }

        // Handle Mongoose validation errors
        if (err instanceof mongoose.Error.ValidationError) {
            console.log('Mongoose validation error:', err.message);
            const messages = Object.values(err.errors).map(e => e.message);
            return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
        }

        // Handle connection errors
        if (err instanceof Error && err.message.includes('connection')) {
            console.log('Database connection error');
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log('GET /api/join - Starting request');

        await connectDB();
        console.log('Database connected');

        const entries = await Waitlist.find({})
            .sort({ createdAt: -1 })
            .select('name country email createdAt')
            .lean();

        console.log(`Found ${entries.length} entries`);

        return NextResponse.json({
            success: true,
            data: entries,
            count: entries.length,
        });
    } catch (err: unknown) {
        console.error('GET /api/join error:', err);

        if (err instanceof Error && err.message.includes('connection')) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
