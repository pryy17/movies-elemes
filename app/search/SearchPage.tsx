"use client";

import Card from '@/components/atoms/Card';
import Search from '@/components/atoms/search';
import { getSearchMovies, MoviesTypes } from '@/services/getDataMovies';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const queryUrl = searchParams.get("searchQuery") || '';
    const [dataSearch, setDataSearch] = useState<MoviesTypes[]>([])
    const [querySearch, setQuerySearch] = useState<string>(queryUrl || "")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getSearchMovies(querySearch, page).then((data: { data: MoviesTypes[], totalPage: number }) => { setDataSearch(data.data); setTotalPages(data.totalPage); setIsLoading(false) }).catch(() => {
            console.error("server time out")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [querySearch, page])

    if (dataSearch.length === 0 || isLoading) {
        return (
            <div>
                <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
                    <main className="py-32 px-16 bg-white dark:bg-black sm:items-start">
                        <div className="border-2 border-gray-400 px-9 py-7 rounded-2xl">
                            <div className="flex mb-8 justify-between">
                                <Search setQuery={setQuerySearch} />
                            </div>
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
                    </main>
                </div>
            </div>
        )
    }

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handleSelectPage = (num: number) => {
        setPage(num);
    };

    console.log(totalPages)
    return (
        <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
            <main className="py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Link href={"/"}>
                    <FaArrowLeft className='text-red-700 text-2xl my-5' />
                </Link>
                <div className="border-2 border-gray-400 px-9 py-7 rounded-2xl">
                    <div className="flex mb-8 justify-between">
                        <Search setQuery={setQuerySearch} />
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full justify-center'>
                        {
                            dataSearch.map((movie, key) => (
                                <Card img={movie.img} name={movie.name} key={key} />
                            ))
                        }

                    </div>

                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none flex gap-2">

                            {/* Previous */}
                            <li>
                                <button
                                    onClick={handlePrevious}
                                    disabled={page === 1}
                                    className="relative block rounded px-3 py-1.5 text-sm transition disabled:opacity-50 bg-red-500 text-white"
                                >
                                    Previous
                                </button>
                            </li>

                            {/* Numbered pages */}
                            {[...Array(totalPages)].map((_, i) => {
                                const num = i + 1;
                                return (
                                    <li key={num}>
                                        <button
                                            onClick={() => handleSelectPage(num)}
                                            className={`text-white  relative block rounded px-3 py-1.5 text-sm transition ${page === num
                                                ? "bg-neutral-200 dark:bg-red-700 font-semibold"
                                                : "hover:bg-neutral-100 dark:hover:bg-red-700"
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    </li>
                                );
                            })}

                            {/* Next */}
                            <li>
                                <button
                                    onClick={handleNext} 
                                    disabled={page === totalPages}
                                    className="relative block rounded px-3 py-1.5 text-sm transition disabled:opacity-50 bg-red-500 text-white"
                                >
                                    Next
                                </button>
                            </li>

                        </ul>
                    </nav>

                </div>
            </main>
        </div>
    );
}

