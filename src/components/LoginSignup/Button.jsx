import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
