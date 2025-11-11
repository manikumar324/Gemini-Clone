import { createContext, useState, useEffect } from "react";
import { generateGeminiResponse } from "../config/gemini";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");

  // ✅ Load chats and last active chat when app starts
  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    const savedActiveChat = localStorage.getItem("activeChat");

    if (savedChats) setPrevPrompts(JSON.parse(savedChats));
    if (savedActiveChat) {
      const parsedActive = JSON.parse(savedActiveChat);
      setRecentPrompt(parsedActive.prompt);
      setResponse(parsedActive.response);
      setShowResults(true);
    }
  }, []);

  // ✅ Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  // ✅ Save currently active chat (prompt + response)
  useEffect(() => {
    if (recentPrompt && response) {
      localStorage.setItem(
        "activeChat",
        JSON.stringify({ prompt: recentPrompt, response })
      );
    }
  }, [recentPrompt, response]);

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
    setResponse("");
    setRecentPrompt("");
    localStorage.removeItem("activeChat");
  };

  const onSent = async (customPrompt) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim()) return;

    setShowResults(true);
    setLoading(true);
    setRecentPrompt(promptToSend);

    try {
      const result = await generateGeminiResponse(promptToSend);
      setResponse(result);
      setPrevPrompts((prev) => [
        ...prev,
        { prompt: promptToSend, response: result },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Sorry, something went wrong!");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        onSent,
        response,
        setResponse,
        loading,
        setLoading,
        showResults,
        setShowResults,
        prevPrompts,
        recentPrompt,
        setRecentPrompt,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};
