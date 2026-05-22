import { useState, useRef, useEffect } from "react"

export default function ToDoInput({ onAdd, onCancel }) {
  const [text, setText] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const commit = () => {
    const trimmed = text.trim()
    if (trimmed) {
      onAdd(trimmed)
    }
    setText("")
    onCancel?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      commit()
    }
    if (e.key === "Escape") {
      onCancel?.()
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      placeholder="What to do?"
      className="w-full bg-transparent border-b border-white/40 text-sm text-white placeholder-white/30 outline-none"
    />
  )
}
