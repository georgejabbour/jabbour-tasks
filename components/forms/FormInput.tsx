import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: FormInputProps) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="left-2 inline-block bg-none px-1 text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full rounded-md border-0 py-1 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
