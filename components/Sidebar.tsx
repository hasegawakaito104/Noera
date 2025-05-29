'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [threads, setThreads] = useState(() => [
    { id: '1', title: 'Thread 1' },
    { id: '2', title: 'Thread 2' },
    { id: '3', title: 'Thread 3' }
  ])
  const [activeId, setActiveId] = useState('1')

  const handleNewThread = () => {
    const newId = (threads.length + 1).toString()
    const newThread = { id: newId, title: `Thread ${newId}` }
    setThreads([newThread, ...threads])
    setActiveId(newId)
  }

  return (
    <div className="h-full w-64 bg-gray-100 border-r flex flex-col">
      <div className="p-4 border-b">
        <button
          onClick={handleNewThread}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {'+ New Thread'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveId(thread.id)}
            className={`px-4 py-2 cursor-pointer ${
              thread.id === activeId
                ? 'bg-blue-100 text-blue-800 font-semibold'
                : 'hover:bg-gray-200'
            }`}
          >
            {thread.title}
          </div>
        ))}
      </div>
    </div>
  )
}
