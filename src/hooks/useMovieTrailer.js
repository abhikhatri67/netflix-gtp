import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerMovies = useSelector(store => store.movies.trailerMovies);

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Error fetching trailer videos:", error);
      }
    };

    if (!trailerMovies) {
      getMovieVideos();
    }
  }, [movieId, trailerMovies, dispatch]);

  return null;
};

export default useMovieTrailer;
