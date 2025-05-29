'use client'

import { useState } from 'react'
import Image from 'next/image'
import { philosophyQuestions } from '../lib/philosophyQuestions'


interface ChatMessage {
  id: number
}

export default function PhilosophyWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({})

  const currentQuestion = philosophyQuestions[currentQuestionIndex]

  const toggleOption = (optionId: string) => {
    const currentAnswers = answers[currentQuestion.id] || []
    let updatedAnswers
    if (currentAnswers.includes(optionId)) {
      updatedAnswers = currentAnswers.filter((o) => o !== optionId)
    } else {
      if (currentAnswers.length < currentQuestion.maxSelections) {
        updatedAnswers = [...currentAnswers, optionId]
      } else {
        return
      }
    }
    setAnswers({ ...answers, [currentQuestion.id]: updatedAnswers })
  }

  const isSelected = (optionId: string) => {
    return answers[currentQuestion.id]?.includes(optionId)
  }

  const handleNext = () => {
    if (currentQuestionIndex < philosophyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1}</h2>
      <p className="text-gray-600">{currentQuestion.instruction}</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleOption(option.id)}
            className={`cursor-pointer border rounded-lg overflow-hidden transition ${
              isSelected(option.id)
                ? 'ring-4 ring-blue-500'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <Image
              src={`/images/${option.image}`}
              alt={option.label}
              width={300}
              height={300}
              className="object-cover w-full h-auto"
            />
            <div className="p-2 text-center font-medium">{option.label}</div>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
