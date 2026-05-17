import React, { useState } from 'react';
import '../styles.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Aprender React', description: 'Estudar os conceitos básicos de React', completed: false },
    { id: 2, title: 'Criar backend', description: 'Implementar API com Express e MongoDB', completed: true },
  ]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask.title,
          description: newTask.description,
          completed: false,
        },
      ]);
      setNewTask({ title: '', description: '' });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="dashboard-page">
      <div className="container" style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div className="dashboard-container">
          <div className="dashboard-main">
            <div className="dashboard-header">
              <h1>Minhas Tarefas</h1>
              <button style={{ width: 'auto', padding: '10px 20px' }} onClick={() => console.log('Logout')}>
                Sair
              </button>
            </div>

            <form onSubmit={handleAddTask} style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '2px solid #f0f0f0' }}>
              <div className="form-group">
                <label>Nova Tarefa</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Título da tarefa"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Descrição da tarefa"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '5px',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                  }}
                  rows="3"
                />
              </div>
              <button type="submit">Adicionar Tarefa</button>
            </form>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999' }}>Nenhuma tarefa. Crie uma nova!</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="task-item">
                  <div style={{ flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'inline-block' }}>
                      <div className="task-title" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </div>
                      <div className="task-description">{task.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      width: 'auto',
                      padding: '8px 12px',
                      background: '#ff6b6b',
                      marginLeft: '10px',
                    }}
                  >
                    Deletar
                  </button>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
