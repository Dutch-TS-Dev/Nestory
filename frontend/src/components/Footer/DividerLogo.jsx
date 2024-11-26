import React from "react";

export default function DividerLogo() {
  return (
    <div className=" mx-[10%]">
      <div className="flex items-center justify-center my-8">
        <div className="flex-grow border-t border-gray-300"></div>

        <div className="mx-4 text-center">
          {/* Dein zentrales Symbol oder Bild */}
          <img
            src="/images/logo/nestoryFull.png"
            alt="Logo"
            className="h-auto w-40"
          />
        </div>

        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
}
