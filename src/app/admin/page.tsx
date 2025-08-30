'use client';

import { useEffect, useState } from 'react';

type WaitlistEntry = {
    id: number;
    name: string;
    country: string;
    email: string;
};

export default function AdminPage() {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Simple prompt for username/password
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');

        // Hardcoded credentials (change these)
        if (username === 'admin' && password === 'admin2030') {
            setAuthorized(true);

            // Fetch data from your API
            fetch('/api/join')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setEntries(data);
                    } else {
                        alert('Failed to fetch data: ' + data.error);
                    }
                });
        } else {
            alert('Unauthorized');
        }
    }, []);

    const exportCSV = () => {
        if (!entries.length) return;

        const headers = Object.keys(entries[0]).join(',');
        const rows = entries.map(e => `${e.id},"${e.name}","${e.country}","${e.email}"`).join('\n');
        const csvContent = headers + '\n' + rows;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'waitlist_entries.csv');
        link.click();
    };

    if (!authorized) return <p className="p-6 text-red-500">Access Denied</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Waitlist Entries</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={exportCSV}
            >
                Export CSV
            </button>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Country</th>
                        <th className="border px-2 py-1">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(e => (
                        <tr key={e.id}>
                            <td className="border px-2 py-1">{e.id}</td>
                            <td className="border px-2 py-1">{e.name}</td>
                            <td className="border px-2 py-1">{e.country}</td>
                            <td className="border px-2 py-1">{e.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
