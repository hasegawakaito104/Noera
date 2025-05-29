import React from "react";

export const ChatBubble = ({
  from,
  text,
}: {
  from: string;
  text: string;
}) => {
  const isUser = from === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-2xl px-4 py-2 rounded-lg whitespace-pre-wrap ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};
