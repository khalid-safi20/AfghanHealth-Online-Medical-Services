import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

// Gemini API Key
const genAI = new GoogleGenerativeAI("AIzaSyATz7JlfswVng7wKb-yqkN6_ISyZuzS0bs");

const AskAI = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

 async function generateAnswer(e) {
  e.preventDefault();
  if (!question.trim()) return;

  setGeneratingAnswer(true);
  const currentQuestion = question;
  setQuestion("");

  setChatHistory((prev) => [...prev, { type: "user", content: currentQuestion }]);

  try {
    const genAI = new GoogleGenerativeAI("AIzaSyATz7JlfswVng7wKb-yqkN6_ISyZuzS0bs");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent([currentQuestion]);
    const response = await result.response;
    const text = response.text();

    setChatHistory((prev) => [...prev, { type: "ai", content: text }]);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    setChatHistory((prev) => [
      ...prev,
      {
        type: "ai",
        content: "⚠️ Gemini AI Error. Please try again.",
      },
    ]);
  }

  setGeneratingAnswer(false);
}


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert(t("ai.copied") || "Copied!"),
      (err) => alert(t("ai.copyFailed") + err)
    );
  };

  const themeStyles = {
    light: {
      background: "bg-[#F5EFFF]",
      text: "text-gray-800",
      chatBubble: "bg-white text-gray-800",
      input: "bg-white border-gray-300 text-gray-800",
    },
    dark: {
      background: "bg-gray-900",
      text: "text-gray-200",
      chatBubble: "bg-gray-700 text-gray-200",
      input: "bg-gray-800 border-gray-600 text-gray-200",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`fixed inset-0 ${currentTheme.background}`}>
      <div className="flex flex-col h-full max-w-4xl p-3 mx-auto">
        <header className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-bold text-[#7E60BF]">{t('ai.title')}</h1>
          <div className="flex gap-3">
            <button onClick={toggleTheme} className={`px-4 py-2 rounded-lg ${currentTheme.chatBubble}`}>
              {theme === "light" ? t('ai.darkMode') : t('ai.lightMode')}
            </button>
            <button onClick={clearChatHistory} className={`px-4 py-2 rounded-lg ${currentTheme.chatBubble}`}>
              {t('ai.clear')}
            </button>
            <button onClick={() => navigate("/")} className="px-4 py-2 text-white rounded-lg" style={{ backgroundColor: "#7E60BF" }}>
              {t('ai.back')}
            </button>
          </div>
        </header>

        <div ref={chatContainerRef} className={`flex-1 overflow-y-auto mb-4 rounded-lg shadow-lg p-4 ${currentTheme.chatBubble}`}>
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="max-w-2xl p-8 rounded-xl" style={{ backgroundColor: theme === "light" ? "#F5EFFF" : "#2D3748" }}>
                <h2 className="text-2xl font-bold text-[#7E60BF]">{t('ai.welcome')}</h2>
                <p className="mt-4 text-sm">{t('ai.subtitle')}</p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`flex items-start mb-4 ${chat.type === "user" ? "justify-end" : ""}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-lg shadow-md ${
                  chat.type === "user" ? "bg-[#7E60BF] text-white rounded-br-none" : `${currentTheme.chatBubble} rounded-bl-none`
                }`}>
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                  {chat.type === "ai" && (
                    <div className="mt-2">
                      <button onClick={() => copyToClipboard(chat.content)} className="text-xs text-blue-500 hover:underline">
                        📋 {t('ai.copy')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {generatingAnswer && (
            <div className="flex items-start">
              <div className="inline-block p-3 bg-gray-100 rounded-lg animate-pulse">
                {t('ai.thinking')}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={generateAnswer} className="p-4 rounded-lg shadow-lg">
          <div className="flex gap-2">
            <textarea
              required
              className={`flex-1 rounded p-3 focus:ring-2 resize-none border-2 border-[#7E60BF] ${currentTheme.input}`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t('ai.placeholder')}
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 rounded-md ${generatingAnswer ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: "#7E60BF", color: "#ffffff" }}
              disabled={generatingAnswer}
            >
              {t('ai.send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskAI;
