
'use client';
import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  status: string;
  due_date: string;
};

export default function TaskList({ session }: { session: any }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('http://localhost:8000/api/tasks',
        {
          headers: {
            Authorization: `Bearer ${session?.data?.sessionToken}`,
          }
        }
      );
      const data = await res.json();
      console.log('data', data);
      setTasks(data);
    }
    fetchTasks();
  }, [session]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      {tasks.length === 0 &&
        <p className='text-gray-500'>No tasks found</p>
      }
      <ul className="space-y-4">
        {tasks && tasks.length > 0 && tasks.map((task) => (
          <li key={task.id} className="p-4 rounded-md bg-gray-500 shadow-lg">
            <h2 className="text-lg font-semibold text-white">{task.title}</h2>
            <p className="text-sm text-white">Status: {task.status}</p>
            <p className="text-sm text-white">Due Date: {task.due_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
