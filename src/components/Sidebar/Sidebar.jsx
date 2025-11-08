import React, { useState } from "react";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div
      className={`min-h-screen bg-[#f0f4f9] py-5 px-3 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-hidden ${
        extended ? "w-56" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 h-5 ml-2 cursor-pointer"
          onClick={() => setExtended((prev) => !prev)}
        />

        {/* New Chat Button */}
        <div className="mt-12 flex items-center gap-2 py-2 px-3 bg-[#e6eaf1] rounded-full cursor-pointer text-md text-gray-400 transition-all duration-300 ease-in-out">
          <img src={assets.plus_icon} alt="plus_icon" className="w-5" />
          <p
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
              extended ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            New Chat
          </p>
        </div>

        {/* Recent Chats */}
        <div className="flex flex-col transition-all duration-300 ease-in-out">
          <p
            className={`mt-7 mb-5 font-semibold transition-all duration-300 ${
              extended ? "opacity-100 h-auto" : "opacity-0 h-0"
            }`}
          >
            Recent Chats
          </p>
          <div className="flex items-center gap-2 p-2 pr-9 rounded-xl text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
            <img
              src={assets.message_icon}
              alt="chat_icon"
              className="w-5 h-5 object-contain"
            />
            <p
              className={`text-sm leading-none whitespace-nowrap overflow-hidden transition-all duration-300 ${
                extended ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              What is React ...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section (Fixed Icons) */}
      <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
        {[
          { icon: assets.question_icon, text: "Help" },
          { icon: assets.history_icon, text: "Activity" },
          { icon: assets.setting_icon, text: "Settings" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#e2e6eb] p-1.5 rounded-xl transition-all duration-300"
          >
            <img src={item.icon} alt={item.text} className="w-5" />
            <p
              className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                extended ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
