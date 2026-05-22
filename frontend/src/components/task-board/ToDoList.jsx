import { useState, useEffect, useRef, useCallback } from "react"

export default function ToDoList({ tasks, onToggle, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [menuTaskId, setMenuTaskId] = useState(null)
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null)

  const closeMenu = useCallback(() => setMenuTaskId(null), [])

  useEffect(() => {
    if (!menuTaskId) return
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuTaskId, closeMenu])

  const handleContextMenu = (e, taskId) => {
    e.preventDefault()
    setMenuPos({ x: e.clientX, y: e.clientY })
    setMenuTaskId(taskId)
    setEditingId(null)
  }

  const handleDelete = () => {
    if (menuTaskId != null) {
      onDelete(menuTaskId)
      closeMenu()
    }
  }

  const handleDoubleClick = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      onEdit(id, editText.trim())
    }
    setEditingId(null)
  }

  return (
    <>
    <ul className="space-y-1 max-h-48 overflow-y-auto ">
      {tasks.map((task) => (
        <li key={task.id} onContextMenu={(e) => handleContextMenu(e, task.id)} className="flex items-center gap-2 py-0.5 ">
          <button
            onClick={() => onToggle(task.id)}
            className={`w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer
              ${task.checked
                ? "bg-emerald-800 border-emerald-800"
                : "border-white/60 hover:border-white"}`}
          >
            {task.checked && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.5 2.5L5.5 13 2 9l1.5-1.5L5.5 10l6.5-9L13.5 2.5z" />
              </svg>
            )}
          </button>

          {editingId === task.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleEditSubmit(task.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSubmit(task.id)
                if (e.key === "Escape") setEditingId(null)
              }}
              className="bg-transparent border-b border-white/40 text-sm text-white outline-none flex-1"
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={() => handleDoubleClick(task)}
              className={`text-sm cursor-pointer flex-1 drop-shadow-[2px_2px_2px_rgba(101,67,33,0.8)] ${task.checked ? "line-through text-amber-200/50" : "text-amber-200"}`}
            >
              {task.text}
            </span>
          )}
        </li>
      ))}
    </ul>

      {menuTaskId != null && (
        <div
          ref={menuRef}
          style={{ left: menuPos.x, top: menuPos.y, position: "fixed" }}
          className="z-50 bg-amber-100 border border-yellow-900 shadow-lg"
        >
          <button
            onClick={handleDelete}
            className="w-full px-3 py-1.5 text-sm text-red-400 hover:bg-amber-200 text-left whitespace-nowrap  cursor-pointer"
          >
            Delete task
          </button>
        </div>
      )}
    </>
  )
}
