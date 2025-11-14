'use client'
import Search from "@/components/atoms/search";
import Modal from "@/components/molecules/Modal";
import { MoviesSlide } from "@/components/molecules/MoviesSlide";
import { apiService } from "@/services/axios";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, MoviesTypes } from "@/services/getDataMovies";
import { getAiringToday, getOnTheAirTv, getPopularTv, getTopRatedTv } from "@/services/getDataTv";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from 'react'

export default function Home() {
  // movies
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesTypes[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<MoviesTypes[]>([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviesTypes[]>([])
  const [popularMovies, setPopularMovies] = useState<MoviesTypes[]>([])

  // tv
  const [popularTv, setPopularTv] = useState<MoviesTypes[]>([])
  const [airingToday, setAiringToday] = useState<MoviesTypes[]>([])
  const [onTheAirTv, setOnTheAirTv] = useState<MoviesTypes[]>([])
  const [topRated, setTopRated] = useState<MoviesTypes[]>([])

  const [typeFilm, setTypeFilm] = useState<"tv" | "movies">("movies")
  const [watchListState, setWatchListState] = useState<MoviesTypes[]>([])
  let [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    if (typeFilm === "movies") {
      getTopRatedMovies().then((data: MoviesTypes[]) => { setTopRatedMovies(data) })
      getUpcomingMovies().then((data: MoviesTypes[]) => { setUpcomingMovies(data) })
      getNowPlayingMovies().then((data: MoviesTypes[]) => { setNowPlayingMovies(data) })
      getPopularMovies().then((data: MoviesTypes[]) => { setPopularMovies(data) })
    }

    if (typeFilm === "tv") {
      getPopularTv().then((data: MoviesTypes[]) => { setPopularTv(data) })
      getAiringToday().then((data: MoviesTypes[]) => { setAiringToday(data) })
      getOnTheAirTv().then((data: MoviesTypes[]) => { setOnTheAirTv(data) })
      getTopRatedTv().then((data: MoviesTypes[]) => { setTopRated(data) })
    }
  }, [typeFilm])

  useEffect(() => {
    // Ambil data lama
    const raw = localStorage.getItem("watchList");
    const currentWatchList: MoviesTypes[] = raw ? JSON.parse(raw) : [];
    setWatchListState(currentWatchList)
  }, [isOpen])

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="border-2 border-gray-400 px-9 py-7 rounded-2xl">
          <div className="flex mb-8 justify-between">
            <div className="grid grid-cols-4 gap-5">
              <button tabIndex={0} onClick={() => setTypeFilm("movies")} className="bg-red-700 hover:bg-red-950 text-white py-2 px-4 rounded">
                Movies
              </button>
              <button tabIndex={1} onClick={() => setTypeFilm("tv")} className="bg-red-700 hover:bg-red-950 text-white py-2 px-4 rounded">
                TV & Series
              </button>
              <div className="flex" tabIndex={2}>
                <div className="border-l-2 border-white w-1 mr-4" />
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} textOpen="Watch List" children={
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-5"
                    >
                      Watch List
                    </Dialog.Title>
                    <div className="flex-col">
                      {
                        watchListState.map(movie => (
                          <div className="border-2 w-full px-7 - py-4">
                            <p>{movie.name}</p>
                          </div>
                        ))
                      }
                    </div>
                  </>
                } />
              </div>
            </div>

            <Search />

          </div>
          {(typeFilm === "movies") ?
            <div>
              <MoviesSlide title="Top Rated Movies" data={topRatedMovies} className="mb-7" />
              <MoviesSlide title="Upcoming Movies" data={upcomingMovies} className="mb-7" />
              <MoviesSlide title="Now Playing" data={nowPlayingMovies} className="mb-7" />
              <MoviesSlide title="Popular Movies" data={popularMovies} className="mb-7" />
            </div> : <div>
              <MoviesSlide title="Airing Today" data={airingToday} className="mb-7" />
              <MoviesSlide title="On The Air" data={onTheAirTv} className="mb-7" />
              <MoviesSlide title="Popular" data={popularTv} className="mb-7" />
              <MoviesSlide title="Top Rated" data={topRated} className="mb-7" />
            </div>
          }

        </div>
      </main>
    </div>
  );
}
