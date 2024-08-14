import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector(store => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-70">
      {movieNames.map((name, index) => (
        <MovieList key={name} title={name} movies={movieResults[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
