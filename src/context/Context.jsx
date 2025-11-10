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

  // const onSent = async () => {
  //   if (!input.trim()) return;

  //   setShowResults(true);
  //   setLoading(true);
  //   setRecentPrompt(input);

  //   try {
  //     const result = await generateGeminiResponse(input);
  //     setResponse(result);
  //     setPrevPrompts((prev) => [...prev, { prompt: input, response: result }]);
  //   } catch (error) {
  //     console.error("Error generating response:", error);
  //     setResponse("Sorry, something went wrong!");
  //   } finally {
  //     setLoading(false);
  //     setInput("");
  //   }
  // };

  const onSent = async () => {
    if (!input.trim()) return;

    setShowResults(true);
    setLoading(true);
    setRecentPrompt(input);

    try {
      // Prepend system instruction to make responses concise
      const concisePrompt = `
You are an assistant that always provides concise, relevant answers. 
Focus only on the key points. Avoid unnecessary details or long explanations.

User question: ${input}
    `;

      // Call the AI
      const result = await generateGeminiResponse(concisePrompt);

      // Optional: truncate response
      const maxLength = 800;
      const shortResult =
        result.length > maxLength ? result.slice(0, maxLength) + "..." : result;

      setResponse(shortResult);

      setPrevPrompts((prev) => [
        ...prev,
        { prompt: input, response: shortResult },
      ]);
    } catch (error) {
      // Handle API quota exceeded (429) gracefully
      if (error.status === 429) {
        setResponse("API quota exceeded. Please try again later.");
      } else {
        setResponse("Sorry, something went wrong!");
      }
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
