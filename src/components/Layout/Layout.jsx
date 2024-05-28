import React, { useState } from "react";
import { assets } from "../../assets/assets";
import {
  Explore,
  Lightbulb,
  Message,
  Code,
  AddPhotoAlternateOutlined,
  MicNoneOutlined,
  SendOutlined,
} from "@mui/icons-material";
import Card from "../Card/Card";

const Layout = () => {
  const cardData = [
    {
      message: "Suggest beautiful places to see on an upcoming road trip",
      Icon: Explore,
    },
    {
      message: "Briefly summarize this concept: urban planning",
      Icon: Lightbulb,
    },
    {
      message: "Brainstorm team bonding activities for our work retreat",
      Icon: Message,
    },
    {
      message: "Brainstorm team bonding activities for our work retreat",
      Icon: Code,
    },
  ];

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Auto-resize the textarea
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className="relative min-h-screen flex-1 pb-[15vh]">
      <div className="z-10 flex items-center justify-between p-6 text-[22px]">
        <p className="text-[#C9CCCE]">Gemini</p>
        <div className="flex cursor-pointer items-center justify-center gap-6">
          <a
            href="https://one.google.com/explore-plan/gemini-advanced"
            className="flex items-center justify-center gap-3 rounded-xl bg-[#333637] px-3 py-2 text-sm text-[#E3E3E3]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={"h-6 w-6"}
              src={assets.gemini_icon}
              alt="Gemini Icon"
            />
            <p className="">Try Gemini Advanced</p>
          </a>
          <img
            className="h-10 w-10 rounded-full"
            src={assets.Professional_User}
            alt="Professional User"
          />
        </div>
      </div>
      <div className="z-10 m-auto max-w-[900px]">
        <div className="mx-0 p-5 text-[56px] text-[#c4c7c5]">
          <p className="-mb-5">
            <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
              Hello, Explorer!
            </span>
          </p>
          <p className="text-[#454746]">How can I help you today?</p>
        </div>
        <div className="grid grid-cols-4 gap-4 p-5 text-[#E3E3E3]">
          {cardData.map((card) => (
            <Card key={card.message} message={card.message} Icon={card.Icon} />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="absolute bottom-8 left-0 right-0 z-20 m-auto flex w-full max-w-[850px] items-center justify-between rounded-full bg-[#1E1F20] p-4 py-5 text-[#BDC1C5]">
            <textarea
              className="min-w-[700px] resize-none overflow-hidden rounded-full bg-[#1E1F20] text-[#BDC1C5] outline-none"
              placeholder="Enter a prompt here"
              rows="1"
              value={inputValue}
              onChange={handleInputChange}
              style={{ lineHeight: "1.5", maxHeight: "150px" }}
            />
            <div>
              <AddPhotoAlternateOutlined className="mr-4 cursor-pointer text-[#E3E3E3]" />
              <MicNoneOutlined className="mr-4 cursor-pointer text-[#E3E3E3]" />
              {inputValue && (
                <SendOutlined className="cursor-pointer text-[#E3E3E3]" />
              )}
            </div>
          </div>
          <p className="absolute bottom-2 left-0 right-0 m-auto max-w-[600px] text-center text-[11px]">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
            <a
              href="https://support.google.com/gemini?p=privacy_notice"
              className="underline"
            >
              Your privacy & Gemini Apps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
