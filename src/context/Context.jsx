import { createContext, useState } from "react";
import { generateGeminiResponse } from "../config/gemini";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");

  const onSent = async () => {
    if (!input.trim()) return;

    setShowResults(true);
    setLoading(true);
    setRecentPrompt(input);

    try {
      const result = await generateGeminiResponse(input);
      setResponse(result);
      setPrevPrompts((prev) => [...prev, { prompt: input, response: result }]);
    } catch (error) {
      setResponse("Error generating response.");
      console.error(error);
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
        loading,
        showResults,
        prevPrompts,
        recentPrompt,
      }}
    >
      {children}
    </Context.Provider>
  );
};
