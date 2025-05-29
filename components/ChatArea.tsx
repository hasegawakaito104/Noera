"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "@/components/ChatBubble";
import { PhilosophyQuestion } from "@/components/PhilosophyQuestion";
import { ProductSuggestions } from "@/components/ProductSuggestions";
import { savePhilosophyTags } from "@/utils/savePhilosophyTags";
import { matchProducts } from "@/utils/matchProducts";
import { products } from "@/data/products";
import { philosophyQuestions } from "@/lib/philosophyQuestions";
import { getOrCreateUserId } from "@/utils/generateUserId";

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
    <div className="flex flex-col h-full overflow-y-auto px-4 py-6 space-y-4">
      {chatMessages.map((msg, index) => (
        <ChatBubble key={index} from={msg.from} text={msg.text} />
      ))}

      {currentQuestionIndex < philosophyQuestions.length && (
        <PhilosophyQuestion
          question={philosophyQuestions[currentQuestionIndex]}
          onNext={handleSelection}
        />
      )}

      {showChatInput && (
        <div className="flex gap-2 items-center border-t pt-4">
          <input
            type="text"
            className="flex-1 border px-3 py-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      )}

      {showProductSuggestions && <ProductSuggestions products={products} />}

      <div ref={chatEndRef} />
    </div>
  );
}
