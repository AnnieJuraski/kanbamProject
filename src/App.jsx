import "./App.css";
import "normalize.css";
import { useEffect, useState } from "react";
import { translations, languages } from "./translations";
import Header from "./components/Header/Header";
import Column from "./components/Column/Column";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";

function App() {
  const getBrowserLanguage = () => {
    const lang = navigator.language.split("-")[0];
    return translations[lang] ? lang : "en";
  };

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("language") || getBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const t = (key) => translations[currentLanguage][key];

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return "dark";
  });

  useEffect(() => {
    // Aplica o atributo no <html> para o CSS ler as variáveis :root
    document.documentElement.setAttribute("data-theme", theme);
    // Salva a preferência do usuário
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = (taskContent, targetColumn) => {
    setColumns((prev) => ({
      ...prev,
      [targetColumn]: {
        ...prev[targetColumn],
        items: [
          ...prev[targetColumn].items,
          { id: Date.now().toString(), content: taskContent },
        ],
      },
    }));
  };

  const deleteTask = (columnKey, taskId) => {
    setColumns((prevState) => ({
      ...prevState,
      [columnKey]: {
        ...prevState[columnKey],
        items: prevState[columnKey].items.filter((item) => item.id !== taskId),
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
    <div className="app">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        languages={languages}
      />

      <div className="container">
        <NewTaskForm columns={columns} addTask={addNewTask} t={t} />

        <div className="columns-container">
          {Object.keys(columns).map((colKey) => (
            <Column
              key={colKey}
              column={columns[colKey]}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDelete={deleteTask}
              t={t}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
