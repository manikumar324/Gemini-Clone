import React, { useState,useEffect } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(() => {
  const saved = localStorage.getItem("sidebarExtended");
  return saved ? JSON.parse(saved) : false;
});

  const { prevPrompts, setRecentPrompt, setResponse, setShowResults, newChat } = useContext(Context);

  useEffect(() => {
  localStorage.setItem("sidebarExtended", JSON.stringify(extended));
}, [extended]);


 const loadPrompt = (prompt) => {
  setRecentPrompt(prompt);

  // Find the stored chat object
  const selectedChat = prevPrompts.find((item) => item.prompt === prompt);
  if (selectedChat) {
    // directly show the saved response
    setResponse(selectedChat.response);
    setShowResults(true);
  }
};


  return (
    <div
      className={`min-h-screen bg-[#f0f4f9] py-5 px-3 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-hidden ${
        extended ? "w-56" : "w-16"
      }`}
    >
      {/* -------- TOP SECTION -------- */}
      <div>
        {/* Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 h-5 ml-2 cursor-pointer"
          onClick={() => setExtended((prev) => !prev)}
        />

        {/* New Chat Button */}
        <div onClick={()=>newChat()} className="mt-12 flex items-center gap-3 py-2 px-3 bg-[#e6eaf1] rounded-full cursor-pointer text-md text-gray-600 hover:bg-[#dbe0ea] transition-all duration-300 ease-in-out">
          <img src={assets.plus_icon} alt="plus_icon" className="w-5" />
          {/* show text only if extended */}
          {extended && <p className="whitespace-nowrap">New Chat</p>}
        </div>

        {/* Recent Chats */}
        {extended && (
          <div className="transition-all duration-300 ease-in-out">
            {/* Recent Chats */}
            <div className="flex flex-col mt-6">
              <p className="mb-3 font-semibold text-gray-600">Recent Chats</p>
              <div className="overflow-y-auto scrollbar-hide max-h-40 pr-1">
                  {prevPrompts.map((item, idx) => {
                return (
                  <div onClick={()=>loadPrompt(item.prompt)} key={idx} className="flex items-center gap-3 p-2 rounded-xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb] transition-all duration-300 ease-in-out ">
                    <img
                      src={assets.message_icon}
                      alt="chat_icon"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="text-sm leading-none">{item.prompt.slice(0,20)}..</p>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* -------- BOTTOM SECTION -------- */}
      <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
        {[
          { icon: assets.question_icon, text: "Help" },
          // { icon: assets.history_icon, text: "Activity" },
          { icon: assets.setting_icon, text: "Settings" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 cursor-pointer hover:bg-[#e2e6eb] p-2 rounded-xl transition-all duration-300"
          >
            <img src={item.icon} alt={item.text} className="w-5" />
            {extended && <p className="text-sm">{item.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
