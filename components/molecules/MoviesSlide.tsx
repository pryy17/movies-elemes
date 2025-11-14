"use client"
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoviesTypes } from '@/services/getDataMovies';
import { FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa';
import { NavigationOptions } from 'swiper/types';

interface MoviesSlideTypes {
    title: string;
    data: MoviesTypes[]
    className?: string
}

export const MoviesSlide: React.FC<MoviesSlideTypes> = ({ title, data, className }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
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

    if (data.length === 0) {
        return (
            <div className={className}>
                <h2><p className="text-white text-4xl">{title || "title movie"}</p></h2>
                {
                    <div id="card">
                        <div className="relative flex flex-col my-6 bg-black shadow-sm border border-[#999999] rounded-lg w-72">
                            <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border flex items-center justify-center">
                                <div
                                    className="mx-auto inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status"
                                >
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >
                                        Loading...
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                }

            </div>
        )
    }

    return (
        <div className={className}>
            <h2><p className="text-white text-4xl">{title || "title movie"}</p></h2>
            <div className="relative">
                {/* TOMBOL PREV */}
                <button
                    ref={prevRef}
                    className="bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/40 absolute left-0 top-1/2 -translate-y-1/2 z-10"
                >
                    <FaArrowLeft className='text-red-500 text-xl' />
                </button>

                {/* TOMBOL NEXT */}
                <button
                    ref={nextRef}
                    className="bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/40 absolute right-0 top-1/2 -translate-y-1/2 z-10"
                >
                    <FaArrowRight className='text-red-500 text-xl' />
                </button>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={5}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    // FIX NEXT.JS: koneksi tombol dibuat di onBeforeInit
                    onBeforeInit={(swiper) => {
                        const nav = swiper.params.navigation as NavigationOptions;
                        nav.prevEl = prevRef.current;
                        nav.nextEl = nextRef.current;
                    }}
                    onSwiper={(swiper) => {
                        // Setelah swiper siap, update navigation lagi
                        const nav = swiper.params.navigation as NavigationOptions;
                        nav.prevEl = prevRef.current;
                        nav.nextEl = nextRef.current;

                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 }, 
                        640: { slidesPerView: 2, spaceBetween: 30 },  
                        1024: { slidesPerView: 4, spaceBetween: 40 }, 
                        1280: { slidesPerView: 5, spaceBetween: 50 }  
                    }}
                >
                    {
                        data.map((movie) => (

                            <SwiperSlide>
                                <div id="card">
                                    <div className="relative flex flex-col my-6 bg-black shadow-sm border border-[#999999] rounded-lg md:w-52 xl:72">
                                        <div className="relative p-2.5 h-60 overflow-hidden rounded-xl bg-clip-border">
                                            <img
                                                src={movie.img}
                                                alt="card-image"
                                                className="h-full w-full object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-xl font-semibold text-white">
                                                    {movie.name}
                                                </p>
                                                {
                                                    watchListState.some(w => w?.name === movie.name)
                                                        ? (
                                                            <FaHeart
                                                                onClick={() => handleWatchlist(movie)}
                                                                className="text-red-500 cursor-pointer mr-2"
                                                            />
                                                        )
                                                        : (
                                                            <FaHeart
                                                                onClick={() => handleWatchlist(movie)}
                                                                className="text-white cursor-pointer mr-2 hover:text-red-500"
                                                            />
                                                        )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
