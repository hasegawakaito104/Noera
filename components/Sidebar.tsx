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
    <div className="h-full w-64 bg-gray-900 text-gray-100 border-r flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={handleNewThread}
          className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
                ? 'bg-gray-700 text-white font-semibold'
                : 'hover:bg-gray-800'
            }`}
          >
            {thread.title}
          </div>
        ))}
      </div>
    </div>
  )
}
