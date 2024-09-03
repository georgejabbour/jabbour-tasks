// app/tasks/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

export default function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    async function fetchTask() {
      if (id) {
        const res = await fetch(`localhost:8000/api/tasks/${id}`);
        const data = await res.json();
        setTask(data);
      }
    }
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
      <a href={`/tasks/${task.id}/edit`}>
        <a className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-white rounded">Edit Task</a>
      </a>
    </div>
  );
}
