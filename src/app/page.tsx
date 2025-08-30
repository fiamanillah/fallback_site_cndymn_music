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

            const data = await res.json().catch(() => null); // prevent parse crash

            if (!res.ok) {
                setMessage('❌ ' + (data?.error || 'Something went wrong'));
                return;
            }

            if (data?.success) {
                setMessage('✅ Thanks for joining the waitlist!');
                setForm({ name: '', country: '', email: '' });
            }
        } catch (err) {
            setMessage('❌ Network error: ' + (err as Error).message);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full flex flex-col items-center">
                <Logo />
                <h1 className="text-4xl font-bold m-2">Certification Program Launches Soon..</h1>
                <p className="mb-6 text-gray-600">Join The Waitlist.</p>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl  w-full max-w-sm space-y-4"
                >
                    <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />

                    <Select
                        value={form.country}
                        onValueChange={val => setForm({ ...form, country: val })}
                    >
                        <SelectTrigger className="!w-full">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country: string) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <Button type="submit" className="w-full">
                        Join Waitlist
                    </Button>
                </form>
            </div>
            {message && <p className="mt-4">{message}</p>}
        </main>
    );
}
