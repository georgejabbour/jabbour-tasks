// app/tasks/create/page.tsx

'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { submitTaskData } from '@/lib/taskHelpers';

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const success = await submitTaskData('http://localhost:8000/api/tasks', 'POST', {
            title,
            description,
            due_date: dueDate,
            status,
        });
        if (success) {
            router.push('/tasks');
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="due_date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}
