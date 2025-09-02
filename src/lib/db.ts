import mongoose from 'mongoose';

// Waitlist schema
const waitlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
            maxlength: [100, 'Country cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: [255, 'Email cannot exceed 255 characters'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Create model (only if it doesn't exist)
export const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);

// Database connection
export let isConnected = false;

export async function connectDB() {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');

        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/waitlist';

        console.log('MongoDB URI:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });

        isConnected = true;
        console.log('MongoDB connected successfully');

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        isConnected = false;
        throw new Error(
            `Database connection failed: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
}
