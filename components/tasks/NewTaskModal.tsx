// components/tasks/NewTaskModal.tsx
'use client';
import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import FormInput from '../forms/FormInput';
import FormDropdown from '../forms/FormDropdown';
import FormDatePicker from '../forms/FormDatePicker';

type Task = {
    title: string;
    status: string;
    dueDate?: string;
    type: string;
};

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    newTask: Partial<Task>;
    setNewTask: React.Dispatch<React.SetStateAction<Partial<Task>>>;
    handleCreate: () => void;
    handleUpdate: () => void;
    handleNewTaskCancel: () => void;
    isEditMode: boolean;
}

export default function NewTaskModal({
    isOpen,
    onClose,
    newTask,
    setNewTask,
    handleCreate,
    handleUpdate,
    handleNewTaskCancel,
    isEditMode
}: NewTaskModalProps) {
    
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
                    >
                        <div>
                            <div>
                                <DialogTitle as="h3" className="text-lg text-center font-semibold leading-6 text-gray-900">
                                    {isEditMode ? 'Edit Task' : 'Add New Task'}
                                </DialogTitle>
                                <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-4">
                                        <FormInput
                                            id="new-task-title"
                                            name="title"
                                            label="Title"
                                            value={newTask.title || ''}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            placeholder="Task Title"
                                        />
                                        <FormDropdown
                                            id="new-task-type"
                                            name="type"
                                            label="Type"
                                            value={newTask.type || ''}
                                            options={[
                                                { label: 'Task', value: 'Task' },
                                                { label: 'Note', value: 'Note' },
                                                { label: 'Grocery', value: 'Grocery' },
                                                { label: 'Maintenance', value: 'Maintenance' },
                                                { label: 'Todo', value: 'Todo' },
                                            ]}
                                            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                                        />
                                        <FormDropdown
                                            id="new-task-status"
                                            name="status"
                                            label="Status"
                                            value={newTask.status || ''}
                                            options={[
                                                { label: 'Open', value: 'Open' },
                                                { label: 'Active', value: 'Active' },
                                                { label: 'Completed', value: 'Completed' },
                                                { label: 'Deferred', value: 'Deferred' },
                                                { label: 'Deleted', value: 'Deleted' },
                                            ]}
                                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                        />
                                        <FormDatePicker
                                            id="new-task-due-date"
                                            name="dueDate"
                                            label="Due Date"
                                            value={newTask.dueDate || ''}
                                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 flex justify-between">
                            <button
                                onClick={isEditMode ? handleUpdate : handleCreate}
                                className="inline-flex w-full justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition ease-in-out"
                            >
                                {isEditMode ? 'Update' : 'Save'}
                            </button>
                            <button
                                onClick={handleNewTaskCancel}
                                className="ml-3 inline-flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition ease-in-out"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}