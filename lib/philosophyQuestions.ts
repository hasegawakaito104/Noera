export const philosophyQuestions = [
  {
    id: 1,
    title: 'Choose your approach',
    instruction: 'Select up to 2 options',
    maxSelections: 2,
    options: [
      { id: 'o1', label: 'Minimalism', image: 'minimal.jpg' },
      { id: 'o2', label: 'Pragmatism', image: 'pragmatism.jpg' },
      { id: 'o3', label: 'Experimental', image: 'experimental.jpg' }
    ]
  },
  {
    id: 2,
    title: 'Preferred style',
    instruction: 'Pick one',
    maxSelections: 1,
    options: [
      { id: 's1', label: 'Modern', image: 'modern.jpg' },
      { id: 's2', label: 'Classic', image: 'classic.jpg' }
    ]
  }
]
