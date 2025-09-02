'use client';

import { useEffect, useState } from 'react';

type WaitlistEntry = {
    _id: string; // MongoDB uses _id instead of id
    name: string;
    country: string;
    email: string;
    createdAt: string; // MongoDB timestamp
};

export default function AdminPage() {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simple prompt for username/password
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');

        // Hardcoded credentials (change these)
        if (username === 'admin' && password === 'admin2030') {
            setAuthorized(true);
            fetchEntries();
        } else {
            alert('Unauthorized');
        }
    }, []);

    const fetchEntries = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/join');
            const data = await response.json();

            console.log('API Response:', data); // Debug log

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch data');
            }

            // Handle the new MongoDB API response format
            if (data.success && Array.isArray(data.data)) {
                setEntries(data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            alert('Failed to fetch data: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        if (!entries.length) {
            alert('No data to export');
            return;
        }

        // Create CSV headers
        const headers = ['ID', 'Name', 'Country', 'Email', 'Created At'];

        // Create CSV rows
        const rows = entries.map(e => {
            const createdAt = new Date(e.createdAt).toLocaleString();
            return `"${e._id}","${e.name}","${e.country}","${e.email}","${createdAt}"`;
        });

        const csvContent = headers.join(',') + '\n' + rows.join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `waitlist_entries_${new Date().toISOString().split('T')[0]}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const refreshData = () => {
        fetchEntries();
    };

    if (!authorized) {
        return (
            <div className="p-6">
                <p className="text-red-500 text-center">Access Denied</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Waitlist Entries</h1>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                        onClick={refreshData}
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        onClick={exportCSV}
                        disabled={!entries.length}
                    >
                        Export CSV ({entries.length})
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    Error: {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-8">
                    <p>Loading entries...</p>
                </div>
            ) : entries.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No entries found</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                        <thead>
                            <tr className="bg-muted">
                                <th className="border border-border px-4 py-2 text-left">ID</th>
                                <th className="border border-border px-4 py-2 text-left">Name</th>
                                <th className="border border-border px-4 py-2 text-left">
                                    Country
                                </th>
                                <th className="border border-border px-4 py-2 text-left">Email</th>
                                <th className="border border-border px-4 py-2 text-left">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr
                                    key={entry._id}
                                    className={index % 2 === 0 ? 'bg-background' : 'bg-card'}
                                >
                                    <td className="border border-border px-4 py-2 font-mono text-sm">
                                        {entry._id.slice(-8)}...
                                    </td>
                                    <td className="border border-border px-4 py-2">{entry.name}</td>
                                    <td className="border border-border px-4 py-2">
                                        {entry.country}
                                    </td>
                                    <td className="border border-border px-4 py-2">
                                        {entry.email}
                                    </td>
                                    <td className="border border-border px-4 py-2">
                                        {new Date(entry.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">Total entries: {entries.length}</div>
        </div>
    );
}
