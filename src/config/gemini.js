import axios from "axios";

export async function generateGeminiResponse(prompt) {
  try {
    // Make a request to your backend route (adjust URL after deployment)
    const response = await axios.post("http://localhost:3000/api/gemini", { prompt });
    
    return response.data.reply; // return the backend's response text
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, something went wrong!";
  }
}
