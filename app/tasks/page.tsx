// app/tasks/page.tsx
'use client';
import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  status: string;
  due_date: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('http://localhost:8000/api/tasks');
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul>
        {tasks && tasks.length > 0 && tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <a href={`/tasks/${task.id}`}>
              <a className="text-blue-500 hover:underline">
                {task.title} - {task.status}
              </a>
            </a>
          </li>
        ))}
      </ul>
      <a href="/tasks/create">
        <a className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Create New Task</a>
      </a>
    </div>
  );
}
