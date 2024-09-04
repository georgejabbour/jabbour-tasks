// app/tasks/page.tsx
import TaskList from '@/components/tasks/taskslist';
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  status: string;
  due_date: string;
};

export default function TaskListPage() {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return redirect("/")
  }

  return (
    <TaskList session={session}/>
  );
}
