import { FaDeleteLeft } from "react-icons/fa6";
import "./Task.css";

function Task({item, columnKey, onDelete, onDragStart}) {
    return (
        <div
            className="task"
            draggable
            onDragStart={(e) => onDragStart(columnKey, item)}
        >
            <span className="task-content"> {item.content} </span>
            <button
                className="deleteTask-button"
                onClick={() => onDelete(columnKey, item.id)}
            >
                <FaDeleteLeft />
            </button>
        </div>        
    );
};

export default Task;

