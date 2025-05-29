export type QuestionOption = { id: string; label: string; image: string }

export type PhilosophyQuestion = {
  id: number
  title: string
  instruction: string
  maxSelections: number
  options: QuestionOption[]
}

export const philosophyQuestions: PhilosophyQuestion[] = [
  {
    id: 1,
    title: 'Your Style',
    instruction: 'Choose the styles that appeal to you.',
    maxSelections: 2,
    options: [
      { id: 'minimal', label: 'Minimal', image: 'minimal.jpg' },
      { id: 'futuristic', label: 'Futuristic', image: 'futuristic.jpg' }
    ]
  },
  {
    id: 2,
    title: 'Preferred Colors',
    instruction: 'Select colors you like.',
    maxSelections: 3,
    options: [
      { id: 'black', label: 'Black', image: 'black.jpg' },
      { id: 'white', label: 'White', image: 'white.jpg' },
      { id: 'gold', label: 'Gold', image: 'gold.jpg' }
    ]
  }
]
