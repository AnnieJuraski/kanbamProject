import { useState } from "react";
import "./NewTaskForm.css";

function NewTaskForm({ t, addTask, columns }) {
    const [newTask, setNewTask] = useState("");
    const [activeColumn, setActiveColumn] = useState("toDo");

    const handleSubmit = () => {
        if (newTask.trim() === "") return;

        addTask(newTask, activeColumn);
        setNewTask("");
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={t("placeholder")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="input-task"
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
            <button onClick={handleSubmit} className="add-button">
                {t("addTask")}
            </button>
        </div>
    );
}

export default NewTaskForm;