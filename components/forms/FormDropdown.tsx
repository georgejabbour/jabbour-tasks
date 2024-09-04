import React from 'react';

interface FormDropdownProps {
    id: string;
    name: string;
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

export default function FormDropdown({
    id,
    name,
    label,
    value,
    options,
    onChange,
    required = false,
}: FormDropdownProps) {
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="left-2 inline-block bg-none px-1 text-xs font-medium text-gray-900"
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
