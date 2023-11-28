// EditTaskForm.js
import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <div className='flex flex-col items-center'>
  <div className='w-full max-w-sm'>
    <h2 className='text-2xl font-bold mb-4'>Edit Task</h2>
    <label className='block text-gray-700 text-lg mb-2'>
      Task Name:
      <input
        type="text"
        name="name"
        value={editedTask.name}
        onChange={handleChange}
        required
        className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500'
      />
    </label>
    <label className='block text-gray-700 text-lg mb-2'>
      Task Description:
      <textarea
        name="description"
        value={editedTask.description}
        onChange={handleChange}
        className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500'
      ></textarea>
    </label>
    <label className='block text-gray-700 text-lg mb-2'>
      Priority:
      <select
        name="priority"
        value={editedTask.priority}
        onChange={handleChange}
        className='block w-full px-4 py-2 mt-2 text-lg border rounded-md focus:outline-none focus:border-blue-500'
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>
    <button
      className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleSave}
    >
      Save
    </button>
    <button
      className='bg-red-500 hover:bg-red-700 text-white ml-3 font-bold py-2 px-4 rounded mt-2'
      onClick={onClose}
    >
      Cancel
    </button>
  </div>
</div>

  );
};

export default EditTaskForm;
