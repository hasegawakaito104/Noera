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
    <div
      className={`w-full flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};
