import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import ProductPanel from './ProductPanel'
import '../animations.css'

export default function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col order-2 md:order-none">
        <ChatArea messages={[]} />
      </div>
      <ProductPanel />
    </div>
  )
}
