import { GoogleGenerativeAI } from "@google/generative-ai";

// Create the client with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

console.log("Gemini API Key Loaded:",import.meta.env.VITE_GEMINI_API_KEY);

export async function generateGeminiResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, something went wrong!";
  }
}
