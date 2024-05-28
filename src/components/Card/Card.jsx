import React from "react";

const Card = ({ children, message, Icon }) => {
  return (
    <div className="relative h-[200px] cursor-pointer rounded-[10px] bg-[#1E1F20] p-[15px] hover:bg-[#333537]">
      <p>{message}</p>
      <Icon className="absolute bottom-[10px] right-[15px]" />
    </div>
  );
};

export default Card;
