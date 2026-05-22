import { useState } from "react"
import board from "../../assets/ui/board2.png"
import ToDoInput from "./ToDoInput"
import ToDoList from "./ToDoList"

export default function TaskBoard({ tasks = [], onAddTask, onToggleTask, onEditTask, onDeleteTask }) {
  const [adding, setAdding] = useState(false)

  return (
    <div className="relative w-100 mr-10 font-frog ">
      <img src={board} alt="" className="w-full" />
      <div className="absolute inset-0 flex flex-col p-20 pt-15">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-medium text-amber-200">Activities</span>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="text-amber-200/80 hover:text-amber-300 text-lg leading-none cursor-pointer"
            >
              +
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-2">
            <ToDoInput
              onAdd={onAddTask}
              onCancel={() => setAdding(false)}
            />
          </div>
        )}

        {tasks.length > 0 && (
          <ToDoList tasks={tasks} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} />
        )}
      </div>
    </div>
  )
}
