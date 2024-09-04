const statusColorMapConstant: { [key: string]: string } = {
    'Open': 'bg-blue-100 text-blue-800',
    'Active': 'bg-green-100 text-green-800',
    'Completed': 'bg-gray-100 text-gray-800',
    'Deferred': 'bg-yellow-100 text-yellow-800',
    'Deleted': 'bg-red-100 text-red-800',
};

const typeColorMapConstant: { [key: string]: string } = {
    'Task': 'bg-indigo-100 text-indigo-800',
    'Note': 'bg-purple-100 text-purple-800',
    'Grocery': 'bg-pink-100 text-pink-800',
    'Maintenance': 'bg-teal-100 text-teal-800',
    'Todo': 'bg-orange-100 text-orange-800',
};

export { 
    statusColorMapConstant, 
    typeColorMapConstant
};