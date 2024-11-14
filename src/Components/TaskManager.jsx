import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Check } from 'lucide-react';
import './TaskManager.css';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
    const priorityClass = 
    task.priority === 'high' ? 'high-priority' : 
    task.priority === 'medium' ? 'medium-priority' : 
    'low-priority';
    console.log(priorityClass)
    return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${priorityClass}-tint`}>
      <div>
        <h3 className = 'task-title'>{task.title}</h3>
        <p>{task.description}</p>
        <div className="flex items-center gap-2 ">
        
          <span className={`priority-badge ${priorityClass}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className="text-gray-500 text-sm date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="actions">
        <button
          className={` ${task.completed ? 'completed-btn' : 'text-gray-400'} task-button`}
          onClick={() => onToggle(task.id)}
        >
         {task.completed?'Mark Undone':'Mark Done'}
        </button>
        <button className="edit-btn task-button" onClick={() => onEdit(task)}>
          <Edit2 size={16} />
        </button>
        <button className="delete-btn task-button" onClick={() => onDelete(task.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const TaskManager = () => {


  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      
    ];
  };

  const [tasks, setTasks] = useState(getInitialTasks());
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [editingTask, setEditingTask] = useState(null);


  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [tasks]);

  const addTask = () => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    setIsAddModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = () => {
    if (!editingTask) return;
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'completed' && task.completed) ||
                         (statusFilter === 'active' && !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getTasksBySection = (type) => {
    const today = new Date();
    return filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      if (type === 'upcoming') {
        return !task.completed && dueDate >= today;
      } else if (type === 'overdue') {
        return !task.completed && dueDate < today;
      } else {
        return task.completed;
      }
    });
  };

  return (
    <div className="task-manager">
      <h1 className="task-manager-heading"  >Task Manager</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="add-task-btn" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="section-container">
        <div className = "section upcoming">
          <h2 className="section-title ">Upcoming Tasks</h2>
          {getTasksBySection('upcoming').map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTaskComplete}
              onEdit={setEditingTask}
            />
          ))}
        </div>
        <div className = "section due">
          <h2 className="section-title">Overdue Tasks</h2>
          {getTasksBySection('overdue').map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTaskComplete}
              onEdit={setEditingTask}
            />
          ))}
        </div>
        <div className = "section complete">
          <h2 className="section-title">Completed Tasks</h2>
          {getTasksBySection('completed').map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTaskComplete}
              onEdit={setEditingTask}
            />
          ))}
        </div>
      </div>

      {isAddModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="modal-input"
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className="modal-input"
      ></textarea>
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="modal-input"
      />
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        className="modal-input"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={addTask}
        className="modal-button modal-add-button"
      >
        Add Task
      </button>
      <button
        onClick={() => setIsAddModalOpen(false)}
        className="modal-button modal-cancel-button"
      >
        Cancel
      </button>
    </div>
  </div>
)}

{editingTask && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">Edit Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={editingTask.title}
        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
        className="modal-input"
      />
      <textarea
        placeholder="Description"
        value={editingTask.description}
        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
        className="modal-input"
      ></textarea>
      <input
        type="date"
        value={editingTask.dueDate}
        onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
        className="modal-input"
      />
      <select
        value={editingTask.priority}
        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
        className="modal-input"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={updateTask}
        className="modal-button modal-add-button"
      >
        Update Task
      </button>
      <button
        onClick={() => setEditingTask(null)}
        className="modal-button modal-cancel-button"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default TaskManager;