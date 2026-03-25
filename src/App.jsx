import "./App.css";
import "normalize.css";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CircleFlag } from "react-circle-flags";
import Header from "./components/Header/Header";

function App() {
  const translations = {
    en: {
      toDo: "To Do",
      inProgress: "In Progress",
      onHold: "On Hold",
      done: "Done",
      addTask: "Add Task",
      deleteTask: "Delete Task",
      placeholder: "Enter a new task",
      noTasksWarning: "Drop tasks here",
    },
    es: {
      toDo: "Por Hacer",
      inProgress: "En Progreso",
      onHold: "En Espera",
      done: "Hecho",
      addTask: "Agregar Tarea",
      deleteTask: "Eliminar Tarea",
      placeholder: "Ingrese una nueva tarea",
      noTasksWarning: "Suelta las tareas aquí",
    },
    pt: {
      toDo: "A Fazer",
      inProgress: "Em Progresso",
      onHold: "Em Espera",
      done: "Feito",
      addTask: "Adicionar Tarefa",
      deleteTask: "Excluir Tarefa",
      placeholder: "Insira uma nova tarefa",
      noTasksWarning: "Solte as tarefas aqui",
    },
    it: {
      toDo: "Da Fare",
      inProgress: "In Corso",
      onHold: "In Attesa",
      done: "Fatto",
      addTask: "Aggiungi Compito",
      deleteTask: "Elimina Compito",
      placeholder: "Inserisci un nuovo compito",
      noTasksWarning: "Rilascia i compiti qui",
    },
  };

  const languages = {
    en: { label: "English", code: "gb" },
    pt: { label: "Português", code: "br" },
    es: { label: "Español", code: "es" },
    it: { label: "Italiano", code: "it" },
  };

  const getBrowserLanguage = () => {
    const lang = navigator.language.toLowerCase();

    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("it")) return "it";

    return "en";
  };

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) return savedLang;
    return getBrowserLanguage();
  });

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setCurrentLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const t = (key) => translations[currentLanguage][key];




  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const defaultColumns = {
  toDo: { key: "toDo", items: [] },
  inProgress: { key: "inProgress", items: [] },
  onHold: { key: "onHold", items: [] },
  done: { key: "done", items: [] },
  };
  

  const [columns, setColumns] = useState(() => {
    const savedBoard = localStorage.getItem("kanbanBoard");

    if (savedBoard) return JSON.parse(savedBoard);
    return defaultColumns;
  });

  useEffect(() => {
  localStorage.setItem("kanbanBoard", JSON.stringify(columns));
}, [columns]);


  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("toDo");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    setColumns((prev) => ({
      ...prev,
      [activeColumn]: {
        ...prev[activeColumn],
        items: [
          ...prev[activeColumn].items,
          { id: Date.now().toString(), content: newTask },
        ],
      },
    }));
    setNewTask("");
  };

  const deleteTask = (columnKey, taskId) => {
    setColumns((prevState) => ({
      ...prevState,
      [columnKey]: {
        ...prevState[columnKey],
        items: prevState[columnKey].items.filter(
          (item) => item.id !== taskId
        ),
      },
    }));
  };

  const handleDragStart = (columnKey, item) => {
    setDraggedItem({ columnKey, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnKey) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { columnKey: sourceColumnKey, item } = draggedItem;

    if (sourceColumnKey === columnKey) return;

    const updatedColumns = { ...columns };

    updatedColumns[sourceColumnKey].items = updatedColumns[
      sourceColumnKey
    ].items.filter((i) => i.id != item.id);

    updatedColumns[columnKey].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  return (

    <div className={`app ${theme}`}>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        languages={languages}
      />


      <div className='container'>

        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder={t("placeholder")}
            className="input"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />

          <select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            className="new-task__select"
          >
            {Object.keys(columns).map((columnKey) => (
              <option value={columnKey} key={columnKey}>
                {t(columns[columnKey].key)}
              </option>
            ))}
          </select>

          <button onClick={addNewTask} className="add-button">
            {t("addTask")}
          </button>
        </div>

        <div className="columns-container">
          {Object.keys(columns).map((col) => (
            <div
              key={col}
              className="column"
              onDragOver={(e) => handleDragOver(e, col)}
              onDrop={(e) => handleDrop(e, col)}
            >
              <div className={`column-header ${columns[col].key}`}>
                {t(columns[col].key)}
              </div>

              <div className="column-content">
                {columns[col].items.length === 0 ? (
                  <div className="empty-warning">{t("noTasksWarning")}</div>
                ) : (
                  columns[col].items.map((item) => (
                    <div
                      key={item.id}
                      className="task"
                      draggable
                      onDragStart={() => handleDragStart(col, item)}
                    >
                      <span className="task-content"> {item.content} </span>
                      <button
                        className="deleteTask-button"
                        onClick={() => deleteTask(col, item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;