// AddTaskForm.js
import React, { useState } from 'react';

const AddTaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({ name: '', description: '', priority: 'low' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.trim() !== '') {
      onAdd(task);
      setTask({ name: '', description: '', priority: 'low' });
    }
  };

  return (
    <div className='flex flex-col items-center'>
  <form onSubmit={handleSubmit} className='w-full max-w-sm'>
    <label className='block text-gray-700 mt-2 text-lg mb-2'>
      Task Name:
      <input type="text" name="name" value={task.name} onChange={handleChange} required className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500' />
    </label>
    <label className='block text-gray-700 text-lg mb-2'>
      Task Description:
      <textarea name="description" value={task.description} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500'></textarea>
    </label>        
    <label className='block text-gray-700 text-lg mb-2'>
      Priority:
      <select name="priority" value={task.priority} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500'>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>
    <button className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Add Task</button>
  </form>
</div>

  );
};

export default AddTaskForm;
