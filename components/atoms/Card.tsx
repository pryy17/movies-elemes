import { MoviesTypes } from '@/services/getDataMovies';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const Card: React.FC<MoviesTypes> = ({ img, name }) => {
    const [watchListState, setWatchListState] = useState<MoviesTypes[]>([])


    const handleWatchlist = (data: MoviesTypes) => {
        if (typeof window === "undefined") return;

        // Cek apakah sudah ada di watchlist
        const exists = watchListState.some(item => item.name === data.name);

        let updatedList: MoviesTypes[];

        if (exists) {
            // HAPUS jika sudah ada
            updatedList = watchListState.filter(item => item.name !== data.name);
        } else {
            // TAMBAHKAN jika belum ada
            updatedList = [...watchListState, data];
        }

        // Simpan ke localStorage
        localStorage.setItem("watchList", JSON.stringify(updatedList));

        // Update state
        setWatchListState(updatedList);
    };


    useEffect(() => {
        // Ambil data lama
        const raw = localStorage.getItem("watchList");
        const currentWatchList: MoviesTypes[] = raw ? JSON.parse(raw) : [];
        setWatchListState(currentWatchList)
    }, [])
    return (
        <div id="card">
            <div className="relative flex flex-col my-6 bg-black shadow-sm border border-[#999999] rounded-lg w-60">
                <div className="relative p-2.5 h-72 overflow-hidden rounded-xl bg-clip-border">
                    <img
                        src={img}
                        alt="card-image"
                        className="h-full w-full object-cover rounded-md"
                    />
                </div>
                <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white w-56">
                            {name}
                        </p>

                        {
                            watchListState.some(w => w?.name === name)
                                ? (
                                    <FaHeart
                                        onClick={() => handleWatchlist({
                                            name: name,
                                            img: img
                                        })}
                                        className="text-red-500 cursor-pointer mr-2 text-sm"
                                    />
                                )
                                : (
                                    <FaHeart
                                        onClick={() => handleWatchlist({
                                            name: name,
                                            img: img
                                        })}
                                        className="text-white cursor-pointer mr-2 hover:text-red-500"
                                    />
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
