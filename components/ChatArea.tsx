"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { PhilosophyQuestion } from "./PhilosophyQuestion";
import { ProductSuggestions } from "./ProductSuggestions";
import { savePhilosophyTags } from "../utils/savePhilosophyTags";
import { matchProducts } from "../utils/matchProducts";
import { products } from "../data/products";
import { philosophyQuestions } from "../lib/philosophyQuestions";
import { getOrCreateUserId } from "../utils/generateUserId";

export default function ChatArea({ messages }: { messages: any[] }) {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [showChatInput, setShowChatInput] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const userId = getOrCreateUserId(); // ユーザー識別IDを取得（初回のみ生成）

  const handleSelection = async (selectedOptions: string[]) => {
    const currentQuestion = philosophyQuestions[currentQuestionIndex];
    const selectedLabels = currentQuestion.options
      .filter((opt) => selectedOptions.includes(opt.id))
      .map((opt) => opt.label);

    await savePhilosophyTags(selectedOptions, userId); // ← userIdを渡す

    const newMessage = { from: "user", text: selectedLabels.join(", ") };

    setChatMessages((prev) => [...prev, newMessage]);

    if (currentQuestionIndex + 1 < philosophyQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowChatInput(true);
      const updatedMessages = [...chatMessages, newMessage];

      const matched = matchProducts(updatedMessages, products);
      if (matched.length > 0) {
        setShowProductSuggestions(true);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setChatMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map((msg) => ({
              role: msg.from === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
          userId, // ← ここでuserIdを一緒に送信
        }),
      });

      const data = await response.json();
      const assistantMessage = { from: "assistant", text: data.reply };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (
      currentQuestionIndex < philosophyQuestions.length &&
      chatMessages.length === currentQuestionIndex * 2
    ) {
      const question = philosophyQuestions[currentQuestionIndex];
      setChatMessages((prev) => [...prev, { from: "system", text: question.title }]);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white dark:bg-gray-800">
        {chatMessages.map((msg, index) => (
          <ChatBubble key={index} from={msg.from} text={msg.text} />
        ))}

        {currentQuestionIndex < philosophyQuestions.length && (
          <PhilosophyQuestion
            question={philosophyQuestions[currentQuestionIndex]}
            onNext={handleSelection}
          />
        )}

        {showProductSuggestions && <ProductSuggestions products={products} />}

        <div ref={chatEndRef} />
      </div>

      {showChatInput && (
        <div className="border-t border-gray-300 dark:border-gray-700 p-4 flex gap-2 items-center bg-white dark:bg-gray-800">
          <input
            type="text"
            className="flex-1 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
