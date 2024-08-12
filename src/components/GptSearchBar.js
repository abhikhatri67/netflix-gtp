import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageContants";

const GptSearchBar = () => {
  const langKey = useSelector(state => state.config.lang);
  console.log('langKey: ', langKey);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input type="text" value="" className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder} />
        <button className="py-2 px-4 m-4 bg-red-700 text-white col-span-3 rounded-lg">{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GptSearchBar;
