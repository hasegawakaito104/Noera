import Image from "next/image";
import { useState } from "react";


export const PhilosophyQuestion = ({
  question,
  onNext,
}: {
  question: {
    id: number;
    title: string;
    instruction: string;
    maxSelections: number;
    options: { id: string; label: string; image: string }[];
  };
  onNext: (selectedOptions: string[]) => void;
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else if (selected.length < question.maxSelections) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="border rounded-2xl p-4 shadow-md space-y-4 slide-up">
      <h2 className="text-lg font-bold mb-2">{question.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{question.instruction}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleSelection(option.id)}
            className={`cursor-pointer border rounded-2xl p-2 text-center shadow transition ${
              selected.includes(option.id)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black hover:shadow-md'
            }`}
          >
            <Image
              src={`/images/${option.image}`}
              alt={option.label}
              width={150}
              height={150}
              className="object-cover rounded-lg"
            />
            <div className="mt-2">{option.label}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(selected)}
        disabled={selected.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};
