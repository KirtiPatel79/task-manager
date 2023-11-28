// TaskList.js
import React from 'react';
import { useState } from 'react';
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const filteredAndSortedTasks  = tasks
    .filter((task) => selectedPriority === 'all' || task.priority === selectedPriority)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const orderMultiplier = sortOrder === 'asc' ? 1 : -1;
      return orderMultiplier * (priorityOrder[a.priority] - priorityOrder[b.priority]);
    });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };
  return (
<div className='flex flex-col justify-center items-center'>
<div className='mb-4'>
<label className='text-lg font-bold mr-2'>Filter by Priority:</label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className='text-lg border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500'
        >
          <option value='all'>All</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        <button
          onClick={toggleSortOrder}
          className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
        >
          {sortOrder === 'asc' ? 'Sort High to Low' : 'Sort Low to High'}
        </button>
      </div>
  {filteredAndSortedTasks.map((task) => (
    <div key={task.id} className={`flex justify-center items-center bg-gray-100 p-4 my-2 rounded-md w-full max-w-md ${task.completed ? 'bg-green-300':'text-black'}`}>
      <span className='text-lg font-semibold mr-2 px-2 rounded-md  bg-yellow-200'>
         {task.id}.
      </span>
      <input
        type="checkbox"
        onChange={() => onToggle(task.id)}
        checked={task.completed}
        className='mr-3 w-5 h-5 text-green-600 border-0 rounded-md focus:ring-0 cursor-pointer'
      />  
      <span className={`flex-1 mr-4 ml-3 text-lg ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
        {task.name}
      </span>

      <div className='flex gap-4'>
      <span className={`text-sm py-1  font-bold ${
            task.priority === 'high' ? 'text-red-500' :
            task.priority === 'medium' ? 'text-yellow-500' :
            'text-green-500'
          }`}>{task.priority}</span>
        <button
          onClick={() => onEdit(task)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


  );
};

export default TaskList;
