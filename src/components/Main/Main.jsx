import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "../../styles/loader.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";

const Main = () => {
  const {
    input,
    setInput,
    loading,
    response,
    showResults,
    recentPrompt,
    onSent,
  } = useContext(Context);

  const [typedResponse, setTypedResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  // highlight code after markdown renders
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // Typing effect
  useEffect(() => {
    if (response && !loading) {
      setTypedResponse(""); // reset
      let index = 0;
      const interval = setInterval(() => {
        setTypedResponse(response.slice(0, index + 1));
        index++;
        if (index === response.length) clearInterval(interval);
      }, 15); // typing speed
      return () => clearInterval(interval);
    }
  }, [response, loading]);

  // Copy code button handler
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  // Handle mic click - Web Speech API
  const handleMicClick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let transcript = "";
  let silenceTimer;

  recognition.onstart = () => {
    console.log("Listening...");
    setIsListening(true);
  };

  recognition.onend = () => {
    console.log("Stopped listening.");
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    transcript = event.results[0][0].transcript;
    console.log("Converted text from voice:", transcript);
    setInput(transcript);

    // reset silence timer on every result
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
      if (transcript.trim()) {
        console.log("Silence detected → sending automatically");
        onSent(); // automatically send prompt
      }
    }, 1000); // 1 seconds of silence
  };

  recognition.start();
};


  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative bg-white">
      {/* Header */}
      <div className="flex items-start justify-between text-2xl p-3 text-[#585858]">
        <p className="">Gemini</p>
        <img
          src={assets.user_icon}
          alt="user_icon"
          className="w-10 rounded-full"
        />
      </div>

      <div className="max-w-[900px] m-auto">
        {/* Welcome Section */}
        {!showResults && !response && !loading && (
          <div className="text-[16px] md:text-[40px] text-[#c4c7c5] font-semibold p-5">
            <p>
              <span className="bg-linear-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                Hello, Mani
              </span>
            </p>
            <p>How can I help you today?</p>
          </div>
        )}

        {/* Suggested Prompts */}
        {!showResults && !response && !loading && (
          <div className="grid gap-5 p-5 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            {[
              "Suggest beautiful places to see on an upcoming road trip",
              "Briefly Summarize this concept: Urban Planning",
              "Brainstorm team bonding activities for our work retreat",
              "Improve the readability of the following code",
            ].map((prompt, index) => (
              <div
                key={index}
                className="h-30 md:h-40 p-3 bg-[#f0f4f9] rounded-md relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() => setInput(prompt)}
              >
                <p className="text-[#585858] text-[16px]">{prompt}</p>
                <img
                  src={
                    [
                      assets.compass_icon,
                      assets.bulb_icon,
                      assets.message_icon,
                      assets.code_icon,
                    ][index]
                  }
                  alt=""
                  className="w-7 p-1 absolute bg-white rounded-full bottom-2 right-2"
                />
              </div>
            ))}
          </div>
        )}

        {/* Chat Results */}
        {showResults && (
          <div
            className="px-5 space-y-4 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "calc(100vh - 80px - 120px)" }} // 80px header + 120px input area
          >
            {recentPrompt && (
              <div>
                <div className="flex items-center gap-5 mb-6">
                  <img
                    src={assets.user_icon}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-medium text-gray-700">{recentPrompt}</p>
                </div>

                {loading ? (
                  <div className="flex items-start gap-5">
                    <img
                      src={assets.gemini_icon}
                      alt="Gemini"
                      className="w-10 h-10"
                    />
                    <div className="w-full flex flex-col gap-2 wave">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  </div>
                ) : (
                  typedResponse && (
                    <div className="flex items-start gap-5">
                      <img
                        src={assets.gemini_icon}
                        alt="Gemini"
                        className="w-10 h-10"
                      />
                      <div className="prose prose-slate max-w-none text-gray-800 w-full">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              const codeString = String(children).replace(
                                /\n$/,
                                ""
                              );
                              return !inline ? (
                                <div className="relative group">
                                  <button
                                    onClick={() => handleCopy(codeString)}
                                    className="absolute right-2 top-2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                  >
                                    Copy
                                  </button>
                                  <pre className="rounded-lg overflow-x-auto bg-[#1e1e1e] text-white p-3 text-sm">
                                    <code
                                      className={`language-${
                                        match ? match[1] : "javascript"
                                      }`}
                                    >
                                      {codeString}
                                    </code>
                                  </pre>
                                </div>
                              ) : (
                                <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {typedResponse}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Input Section */}
        <div className="fixed bg-white z-10 w-full bottom-0 max-w-[900px] px-5 m-auto">
          <div className="flex items-center justify-between gap-4 px-5 py-3 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-300 focus-within:shadow-[0_6px_25px_rgba(0,0,0,0.2)]">
            <input
              type="text"
              placeholder={
                isListening ? "Listening..." : "Enter a prompt here..."
              }
              className="flex-1 bg-transparent text-[16px] p-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSent()}
            />

            <div className="flex items-center gap-4">
              <img
                src={assets.gallery_icon}
                alt=""
                className="w-5 cursor-pointer"
              />
              <img
                src={assets.mic_icon}
                alt=""
                className="w-5 cursor-pointer"
                onClick={handleMicClick} // <-- voice feature
              />
              <img
                src={assets.send_icon}
                alt=""
                className="w-5 cursor-pointer"
                onClick={() => onSent()}
              />
            </div>
          </div>
          <p className="text-center text-xs my-2 font-normal text-gray-500">
            Gemini may display inaccurate info, including about people.
            Double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
