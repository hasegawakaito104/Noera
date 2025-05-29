'use client'

import { useState } from 'react'
import Image from 'next/image'
import usePhilosophyStore from '../store/usePhilosophyStore'

interface Option {
  id: string
  label: string
  image: string
  tags: string[]
}

interface Question {
  id: number
  title: string
  instruction: string
  maxSelections: number
  options: Option[]
}

interface Props {
  question: Question
  onNext: () => void
}

export default function QuestionBlock({ question, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const addTags = usePhilosophyStore((state) => state.addTags)

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((s) => s !== id))
    } else {
      if (selected.length < question.maxSelections) {
        setSelected((prev) => [...prev, id])
      }
    }
  }

  const handleNext = () => {
    const selectedTags = question.options
      .filter((opt) => selected.includes(opt.id))
      .flatMap((opt) => opt.tags)
    addTags(selectedTags)
    onNext()
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-sm text-gray-500">Question {question.id}</div>
      <div className="text-xl font-semibold">{question.title}</div>
      <div className="text-sm text-gray-500">{question.instruction}</div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((opt) => (
          <div
            key={opt.id}
            className={`border-2 rounded-xl p-2 cursor-pointer transition ${
              selected.includes(opt.id)
                ? 'border-blue-500'
                : 'border-transparent'
            }`}
            onClick={() => toggleSelect(opt.id)}
          >
            <Image
              src={`/philosophy/${opt.image}`}
              alt={opt.label}
              width={500}
              height={500}
              className="rounded-md object-cover w-full h-auto"
            />
            <div className="text-center mt-2 text-sm">{opt.label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-400">{selected.length}/{question.maxSelections} selected</div>
        <button
          disabled={selected.length === 0}
          onClick={handleNext}
          className={`px-4 py-2 rounded-lg text-white transition ${
            selected.length > 0 ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
