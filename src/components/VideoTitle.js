import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-16 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{description}</p>
      <div>
        <button className="text-xl text-black p-4 px-12 bg-white rounded-lg hover:bg-opacity-80"> Play</button>
        <button className="mx-2 text-xl text-white p-4 px-12  bg-gray-500 opacity-50 rounded-lg"> More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
