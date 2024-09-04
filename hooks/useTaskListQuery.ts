import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Task = {
  id: number;
  title: string;
  status: string;
  due_date: string;
  type: string;
};

const fetchTasks = async (sessionToken: string): Promise<Task[]> => {
  const res = await fetch('http://localhost:8000/api/tasks', {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const updateTask = async ({ id, updatedTask, sessionToken }: { id: number, updatedTask: Partial<Task>, sessionToken: string }) => {
  const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(updatedTask),
  });
  if (!res.ok) {
    throw new Error('Failed to update the task');
  }
  return res.json();
};

const deleteTask = async ({ id, sessionToken }: { id: number, sessionToken: string }) => {
  const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to delete the task');
  }
};

const createTask = async ({ newTask, sessionToken }: { newTask: Partial<Task>, sessionToken: string }) => {
  const res = await fetch('http://localhost:8000/api/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(newTask),
  });
  if (!res.ok) {
    throw new Error('Failed to create the task');
  }
  return res.json();
};

export function useTaskListQuery(sessionToken: string) {
  const queryClient = useQueryClient();

  const taskListQuery = useQuery({
    queryKey: ['tasks', sessionToken],
    queryFn: () => fetchTasks(sessionToken as string),
    enabled: !!sessionToken, // Only run if sessionToken is available
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updatedTask }: { id: number, updatedTask: Partial<Task> }) => updateTask({ id, updatedTask, sessionToken: sessionToken as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', sessionToken] }); // Refresh tasks list after updating a task
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTask({ id, sessionToken: sessionToken as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', sessionToken] }); 
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: ({ newTask }: { newTask: Partial<Task> }) => createTask({ newTask, sessionToken: sessionToken as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', sessionToken] }); // Refresh tasks list after creating a task
    },
  });

  return {
    taskListQuery,
    updateTaskMutation,
    deleteTaskMutation,
    createTaskMutation,
  };
}
