'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getNames } from 'country-list';
import Logo from '@/components/logo/Logo';
import { GradientDots } from '@/components/ui/gradient-dots';
import { BorderBeam } from '@/components/ui/border-beam';

export default function Home() {
    const [form, setForm] = useState({ name: '', country: '', email: '' });
    const [message, setMessage] = useState('');
    const countries = getNames();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setMessage(' Error: ' + (data?.error || 'Something went wrong'));
                return;
            }

            if (data?.success) {
                setMessage(' Thanks for joining the waitlist!');
                setForm({ name: '', country: '', email: '' });
            }
        } catch (err) {
            setMessage(' Network error: ' + (err as Error).message);
        }
    };

    return (
        <div>
            <GradientDots duration={20} />
            <main className="relative min-h-screen bg-[#0C0F35]/40 flex flex-col justify-center py-10 px-4">
                <div className="absolute inset-0 bg-[#0C0F35]/70"></div>
                <div className="container mx-auto z-50 px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-8 md:mb-16">
                        <div className="flex justify-center mb-6 md:mb-8">
                            <Logo />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0190e1] to-blue-400">
                            The Resident Creator™
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-300 mb-3 md:mb-4 max-w-3xl mx-auto">
                            An Official Certification Program for the Next Generation of Creators
                        </p>
                        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                            Built with brands. Designed for creators. Backed by research.
                        </p>
                    </div>

                    <div className="relative flex w-full max-w-[500px] mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-[#0C0F35] md:shadow-xl">
                        {/* Waitlist Form Section */}
                        <div className="p-6 md:p-8 rounded-2xl w-full">
                            <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
                                Join The Waitlist
                            </h2>
                            <p className="text-gray-400 text-center mb-4 md:mb-6 text-sm md:text-base">
                                Be the first to know when we launch
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <Input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="bg-gray-800/50 border-gray-700 text-white h-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <Select
                                        value={form.country}
                                        onValueChange={val => setForm({ ...form, country: val })}
                                    >
                                        <SelectTrigger className="!h-12 w-full">
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-60 overflow-y-auto">
                                            {countries.map((country: string) => (
                                                <SelectItem
                                                    key={country}
                                                    value={country}
                                                    className="focus:bg-gray-700"
                                                >
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="bg-gray-800/50 border-gray-700 text-white h-12 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-lg bg-gradient-to-r from-[#0190e1] to-blue-600 hover:from-[#0190e1] hover:to-blue-700 text-white font-bold text-base md:text-lg"
                                >
                                    Join Waitlist
                                </Button>
                            </form>

                            {message && (
                                <div
                                    className={`mt-4 md:mt-6 p-3 rounded-lg text-center text-sm md:text-base ${
                                        message.includes('success')
                                            ? 'bg-green-900/30 text-green-300'
                                            : 'bg-red-900/30 text-red-300'
                                    }`}
                                >
                                    {message}
                                </div>
                            )}
                        </div>

                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                    <p className="text-center text-gray-500 mt-6 md:mt-8 text-xs md:text-sm">
                        © {new Date().getFullYear()} The Resident Creator. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}
