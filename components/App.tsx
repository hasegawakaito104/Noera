import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import ProductPanel from './ProductPanel'

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatArea messages={[]} />
      </div>
      <ProductPanel />
    </div>
  )
}
