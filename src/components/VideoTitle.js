import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{description}</p>
      <div className="my-4 md:my-0">
        <button className="text-xl text-black py-1 md:py-4 px-3 md:px-12 bg-white rounded-lg hover:bg-opacity-80"> Play</button>
        <button className="hidden md:inline-block mx-2 text-xl text-white p-4 px-12  bg-gray-500 opacity-50 rounded-lg"> More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
