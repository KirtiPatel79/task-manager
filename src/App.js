import React, { useState,useEffect } from 'react';
import TaskList from './Components/TaskList';
import AddTaskForm from './Components/AddTask';
import Swal from 'sweetalert2';
import EditTaskForm from './Components/EditTask';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		try {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		} catch (error) {
			console.error("Error saving todos to local storage:", error);
		}
	}, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, completed: false }]);
    setShowAddTaskForm(false);
  };

  const deleteTask = (id) => {
    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If the user confirms, delete the task
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
  
        // Display a success message using SweetAlert2
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setShowEditTaskForm(true);
  };

  const saveEditedTask = (editedTask) => {
    setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
  };

  return (
    <>
    
    <div className='bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-opacity-25 h-screen'>
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl content-center mt-2'>Task Manager</h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded' onClick={() => setShowAddTaskForm(true)}>Add New Task</button>
      {showAddTaskForm && <AddTaskForm onAdd={addTask} />}
      {showEditTaskForm && (
        <EditTaskForm
          task={selectedTask} 
          onSave={saveEditedTask}
          onClose={() => setShowEditTaskForm(false)}
        />
      )}
    </div>
      <div className=' px-6 py-6 flex flex-col items-center justify-center '>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={openEditForm}
      />
    </div>
    
    
</div>
    </>
  );
};

export default App;
