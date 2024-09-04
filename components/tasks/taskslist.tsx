'use client';
import { useEffect, useState } from 'react';
import { useTaskListQuery } from '@/hooks/useTaskListQuery';
import Spinner from '../primitives/spinner';
import moment from 'moment';
import { statusColorMapConstant, typeColorMapConstant } from '@/constants';
import { CalendarIcon } from "@heroicons/react/20/solid";
import NewTaskModal from './NewTaskModal';
import { redirect } from "next/navigation"

type Task = {
  id: number;
  title: string;
  status: string;
  dueDate?: string;
  type: string;
};

export default function TaskList({ session }: { session: any }) {
  if (!session) {
    return redirect("/signin")
  }

  const [editableTaskId, setEditableTaskId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  const [taskTypes, setTaskTypes] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    status: 'Open',
    type: 'Task',
    dueDate: ''
  });
  const [showNewTaskModal, setShowNewTaskModal] = useState(false); // Control visibility of the new task modal
  const [isEditMode, setIsEditMode] = useState(false); // Control if the modal is in edit mode
  const [deleteTaskLoadingTaskID, setDeleteTaskLoadingTaskID] = useState<number | null>(null);
  
  const { taskListQuery, updateTaskMutation, deleteTaskMutation, createTaskMutation } = useTaskListQuery(session?.data?.sessionToken);
  const { isPending, error, data: tasks } = taskListQuery;


  const statusColorMap = statusColorMapConstant;
  const typeColorMap = typeColorMapConstant;

  useEffect(() => {
    const types = Array.from(new Set(tasks!.map((task) => task.type)));
    setTaskTypes(types);
    setActiveTypes(types); // Initially show all tasks
  }, [tasks]);

  const handleEdit = (task: Task) => {
    setEditableTaskId(task.id);
    setNewTask(task);
    setIsEditMode(true);
    setShowNewTaskModal(true);
  };

  const handleUpdate = () => {
    if (editableTaskId) {
      updateTaskMutation.mutate({
        id: editableTaskId,
        updatedTask: newTask,
      });
      setEditableTaskId(null); // Exit edit mode after updating
      setShowNewTaskModal(false); // Hide the modal after updating the task
      setIsEditMode(false); // Reset edit mode
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteTaskLoadingTaskID(id);
    deleteTaskMutation.mutateAsync({ id }).then(() => {
      setDeleteTaskLoadingTaskID(null);
    });
  };

  const handleCancel = () => {
    setEditableTaskId(null); // Exit edit mode without saving
    setEditForm({}); // Clear the form
  };

  const handleCreate = () => {
    createTaskMutation.mutate({ newTask });
    setNewTask({
      title: '',
      status: 'Open',
      type: 'Task',
      dueDate: ''
    }); // Reset form after creating the task
    setShowNewTaskModal(false); // Hide the modal after creating the task
  };

  const handleNewTaskCancel = () => {
    setNewTask({
      title: '',
      status: 'Open',
      type: 'Task',
      dueDate: ''
    }); // Reset form fields
    setShowNewTaskModal(false); // Hide the modal without saving
    setIsEditMode(false); // Reset edit mode
  };

  const toggleFilter = (type: string) => {
    setActiveTypes((prevActiveTypes) =>
      prevActiveTypes.includes(type)
        ? prevActiveTypes.filter((t) => t !== type) // Remove type if already active
        : [...prevActiveTypes, type] // Add type if not active
    );
  };

  const filteredTasks = tasks?.filter((task) => activeTypes.includes(task.type));

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 text-shadow shadow-gray-400">Your Tasks</h1>
      <hr className="mb-3" />
      {/* Add New Task Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            setShowNewTaskModal(true);
            setIsEditMode(false);
          }}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ease-in-out"
        >
          Add Task
        </button>
      </div>

      {/* Filter Pills */}
      <div className="mb-4 flex space-x-2">
        {taskTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTypes.includes(type)
              ? 'bg-blue-500 text-white hover:bg-blue-600 transition ease-in-out'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-100 transition ease-in-out'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {isPending && (
        <div className="flex align-middle justify-center">
          <Spinner /> <span className='ms-3'>Loading</span>
        </div>
      )}

      {!isPending && filteredTasks && session?.data?.sessionToken && (
        <>
          {filteredTasks.length === 0 && (
            <p className="text-gray-500">No tasks found</p>
          )}
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task: Task) => (
              task && (
                <li key={task.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex-1 truncate">
                      {(
                        <>
                          <div className='p-4 pt-3'>
                            <div className="flex">
                              <h3 className="truncate text-lg font-medium text-gray-900 flex gap-2">
                                <span>
                                  {task.title}
                                </span>
                              </h3>
                            </div>
                            <hr className="my-3" />
                            <div className="flex justify-between">
                              <span className={`mt-2 inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColorMap[task.status]}`}>
                                <p className="truncate text-xs text-gray-500 flex gap-2 align-middle">{task.status}</p>
                              </span>
                              <span className={`mt-2 inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${typeColorMap[task.type]}`}>
                                <p className="truncate text-xs text-gray-500 flex gap-2 align-middle">{task.type}</p>
                              </span>
                              <span className={`mt-2 inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColorMap[task.status]}`}>
                                <p className="truncate text-xs text-gray-500 flex gap-2 align-middle">
                                  <CalendarIcon className="size-4 text-gray-900" />
                                  {moment(task.dueDate).format('L')}
                                </p>
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {(
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="flex w-0 flex-1">
                        <button
                          disabled={deleteTaskLoadingTaskID === task.id && deleteTaskMutation.isPending}
                          onClick={() => handleEdit(task)}
                          className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900
                          hover:bg-blue-200 transition ease-in-out
                          "
                        >
                          Edit
                        </button>
                      </div>
                      <div className="-ml-px flex w-0 flex-1">
                        <button
                          disabled={deleteTaskLoadingTaskID === task.id && deleteTaskMutation.isPending}
                          onClick={() => handleDelete(task.id)}
                          className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900
                          hover:bg-red-200 transition ease-in-out"
                        >
                          <div className="flex align-middle justify-center">
                            {deleteTaskLoadingTaskID === task.id && deleteTaskMutation.isPending && (
                              <Spinner size={"10"} color={"black"} />
                            )}
                            Delete
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            ))}
          </ul>
        </>
      )}
      {/* Modal for New Task */}
      <NewTaskModal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        newTask={newTask}
        setNewTask={setNewTask}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleNewTaskCancel={handleNewTaskCancel}
        isEditMode={isEditMode}
      />
    </div>
  );
}