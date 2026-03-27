import Task from "../Task/Task";
import "./Column.css";

function Column({ column, onDragOver, onDrop, onDragStart, onDelete, t}){
    const {key, items} = column;

    return (
        <div
            className="column"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e,key)}
        >
            <div className={`column-header ${key}`}>
                {t(key)}
            </div>

            <div className="column-content">
                {items.length === 0 ? (
                    <div className="empty-warning">{t("noTasksWarning")}</div>
                ) : (
                    items.map((item) => (
                        <Task
                            key= {item.id}
                            item={item}
                            columnKey={key}
                            onDelete={onDelete}
                            onDragStart={onDragStart}
                        />
                    ))                    
                )}
            </div>
        </div>
    );
}

export default Column;