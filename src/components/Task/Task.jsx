import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck, FaXmark } from "react-icons/fa6";
import "./Task.css";


function Task({ item, columnKey, onDelete, onDragStart }) {
    const [isConfirming, setIsConfirming] = useState(false);
    return (
        <div
            className="task"
            draggable={!isConfirming}
            onDragStart={(e) => onDragStart(columnKey, item)}
        >
            <span className="task-content"> {item.content} </span>

            {!isConfirming ? (
                <button
                    className="deleteTask-button"
                    onClick={() => setIsConfirming(true)}
                >
                    <AiFillDelete />
                </button>
            ) : (
                <div className="confirmation-buttons">
                    <button
                        className="confirm-btn"
                        onClick={() => onDelete(columnKey, item.id)}
                    >
                        <FaCheck />
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={() => setIsConfirming(false)}
                    >
                        <FaXmark />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Task;

