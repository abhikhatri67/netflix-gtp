import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTIONS);
        const json = await response.json();
        dispatch(addPopularMovies(json.results));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    if (!popularMovies) {
      getPopularMovies();
    }
  }, [popularMovies, dispatch]);

  return null;
};

export default usePopularMovies;
