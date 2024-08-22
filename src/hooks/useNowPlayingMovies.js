import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", API_OPTIONS);
        const json = await response.json();
        dispatch(addNowPlayingMovies(json.results));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, [nowPlayingMovies, dispatch]);

  return null;
};

export default useNowPlayingMovies;
