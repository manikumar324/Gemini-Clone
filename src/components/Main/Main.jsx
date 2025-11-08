import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import '../../styles/loader.css';

const Main = () => {
  const {
    input,
    setInput,
    onSent,
    loading,
    response,
    showResults,
    prevPrompts,
    recentPrompt, // 👈 added
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* Top Section */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt="user_icon"
          className="w-10 rounded-full"
        />
      </div>

      <div className="max-w-[900px] m-auto">
        {/* Welcome Section (only when no result shown) */}
        {!showResults && !response && !loading && (
          <div className="text-[50px] text-[#c4c7c5] font-semibold p-5">
            <p>
              <span className="bg-linear-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent inline-block [background-image:-webkit-linear-gradient(16deg,#4b90ff,#ff5546)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                Hello, Mani
              </span>
            </p>
            <p>How can I help you today?</p>
          </div>
        )}

        {/* Suggested Prompts (only when no result shown) */}
        {!showResults && !response && !loading && (
          <div className="grid gap-3 p-5 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            <div
              className="h-50 p-3 bg-[#f0f4f9] rounded-md relative cursor-pointer hover:bg-[#dfe4ea]"
              onClick={() =>
                setInput(
                  "Suggest beautiful places to see on an upcoming road trip"
                )
              }
            >
              <p className="text-[#585858] text-[17px]">
                Suggest beautiful places to see on an upcoming road trip
              </p>
              <img
                src={assets.compass_icon}
                alt=""
                className="w-9 p-1 absolute bg-white rounded-full bottom-2 right-2"
              />
            </div>

            <div
              className="h-50 p-3 bg-[#f0f4f9] rounded-md relative cursor-pointer hover:bg-[#dfe4ea]"
              onClick={() =>
                setInput("Briefly Summarize this concept: Urban Planning")
              }
            >
              <p className="text-[#585858] text-[17px]">
                Briefly Summarize this concept: Urban Planning
              </p>
              <img
                src={assets.bulb_icon}
                alt=""
                className="w-9 p-1 absolute bg-white rounded-full bottom-2 right-2"
              />
            </div>

            <div
              className="h-50 p-3 bg-[#f0f4f9] rounded-md relative cursor-pointer hover:bg-[#dfe4ea]"
              onClick={() =>
                setInput(
                  "Brainstorm team bonding activities for our work retreat"
                )
              }
            >
              <p className="text-[#585858] text-[17px]">
                Brainstorm team bonding activities for our work retreat
              </p>
              <img
                src={assets.message_icon}
                alt=""
                className="w-9 p-1 absolute bg-white rounded-full bottom-2 right-2"
              />
            </div>

            <div
              className="h-50 p-3 bg-[#f0f4f9] rounded-md relative cursor-pointer hover:bg-[#dfe4ea]"
              onClick={() =>
                setInput("Improve the readability of the following code")
              }
            >
              <p className="text-[#585858] text-[17px]">
                Improve the readability of the following code
              </p>
              <img
                src={assets.code_icon}
                alt=""
                className="w-9 p-1 absolute bg-white rounded-full bottom-2 right-2"
              />
            </div>
          </div>
        )}

        {/* Chat Results Section */}
        {showResults && (
          <div className="px-5 pb-24 space-y-4">
            {/* Current Chat */}
            {recentPrompt && (
              <div className="">
                <div className="flex items-center gap-5 mb-10">
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
                  response && (
                    <div className="flex items-start gap-5">
                      <img
                        src={assets.gemini_icon}
                        alt="Gemini"
                        className="w-10 h-10"
                      />
                      <p className="text-gray-800 whitespace-pre-wrap">
                        <span className="text-[#ff5546] font-semibold"></span>{" "}
                        {response}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Previous Prompts */}
            {/* {!loading && prevPrompts.length > 0 && (
              <div className="space-y-4">
                {prevPrompts.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#f9fafb] rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-700 mb-2">
                      <span className="text-[#4b90ff]">You:</span> {item.prompt}
                    </p>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      <span className="text-[#ff5546]">Gemini:</span>{" "}
                      {item.response}
                    </p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        )}

        {/* Input Section */}
        <div className="absolute w-full bottom-0 max-w-[900px] px-5 m-auto">
          <div className="flex items-center justify-between gap-5 px-5 py-2 bg-[#f0f4f9] rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
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
