import { useState } from 'react'
import './App.css'

function App() {

  const language = {
    en: {
      toDo: 'To Do',
      inProgress: 'In Progress',
      onHold: 'On Hold',
      done: 'Done',
      addTask: 'Add Task',
      deleteTask: 'Delete Task',
      placeholder: 'Enter a new task'
    },
    es: {
      toDo: 'Por Hacer',
      inProgress: 'En Progreso',
      onHold: 'En Espera',
      done: 'Hecho',
      addTask: 'Agregar Tarea',
      deleteTask: 'Eliminar Tarea',
      placeholder: 'Ingrese una nueva tarea'
    },
    pt: {
      toDo: 'A Fazer',
      inProgress: 'Em Progresso',
      onHold: 'Em Espera',
      done: 'Feito',
      addTask: 'Adicionar Tarefa',
      deleteTask: 'Excluir Tarefa',
      placeholder: 'Insira uma nova tarefa'
    },
    it: {
      toDo: 'Da Fare',
      inProgress: 'In Corso',
      onHold: 'In Attesa',
      done: 'Fatto', 
      addTask: 'Aggiungi Compito',
      deleteTask: 'Elimina Compito',
      placeholder: 'Inserisci un nuovo compito'
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const t = (key) => language[currentLanguage][key];


  const [columns, setColumns] = useState({
    toDo:{
      key: 'toDo',
      items: [
        {id: '1', content: 'Task 1'},
        {id: '2', content: 'Task 2'},
        {id: '3', content: 'Task 3'}
      ]
    } ,
    inProgress:{
      key: 'inProgress',
      items: [
        {id: '1', content: 'Task 1'},
        {id: '2', content: 'Task 2'},
        {id: '3', content: 'Task 3'}
      ]    
    },
    onHold:{
      key: 'onHold',
      items: [
        {id: '1', content: 'Task 1'},
        {id: '2', content: 'Task 2'},
        {id: '3', content: 'Task 3'}
      ]
    },
    done:{
      key: 'done',
      items: [
        {id: '1', content: 'Task 1'},
        {id: '2', content: 'Task 2'},
        {id: '3', content: 'Task 3'}
      ]
    }
  });


  const [newTask, setNewTask] = useState('');
  const [activeColumn, setActiveColumn] = useState("toDo");
  const [draggedItem, setDraggedItem] = useState(null);


  const addNewTask = () => {
    if(newTask.trim() === '') return;

    const updatedColumns = {...columns};

    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask
    });

    setColumns(updatedColumns);
    setNewTask('');
  };


  const deleteTask = (columnKey, taskId) => {
    const updatedColumns = {...columns};

    updatedColumns[columnKey].items = updatedColumns[columnKey]
                                      .items.filter(item => item.id !== taskId);

    setColumns(updatedColumns);
  };


  const handleDragStart = (columnKey, item) => {
    setDraggedItem({ columnKey, item });
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnKey) => {
    e.preventDefault();

    if(!draggedItem) return;

    const {columnKey: sourceColumnKey, item} = draggedItem;

    if(sourceColumnKey === columnKey) return;   

    const updatedColumns = {...columns};

    updatedColumns[sourceColumnKey].items = updatedColumns[sourceColumnKey].
                                            items.filter((i) => i.id != item.id);
    
    updatedColumns[columnKey].items.push(item);

    setColumns(updatedColumns);    
    setDraggedItem(null);
  };



  return (
    <>
      
      <div className='background'>     
          <h1>Kanban Board</h1>
          <div>
            <input type="text" value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={t("placeholder")}
            className='input'
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}/>

            <select value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            className='new-task__select'>
              {Object.keys(columns).map((key) => (
                <option value={key} key={key}>
                  {t(columns[key].key)}
                </option>))}
            </select>

            <button onClick={addNewTask} className='add-button'>
              {t("addTask")}
            </button>
          </div>

      </div>
    </>
  )
}

export default App;
