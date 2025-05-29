import React from "react";

export const ChatBubble = ({
  from,
  text,
  className = '',
}: {
  from: string;
  text: string;
  className?: string;
}) => {
  const isUser = from === "user";

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 ${className}`}> 
      <div
        className={`max-w-2xl px-4 py-2 rounded-2xl shadow whitespace-pre-wrap transition ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {text}
      </div>
    </div>
  );
};
