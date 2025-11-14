import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';

export const Search = ({ setQuery }: { setQuery?: Dispatch<SetStateAction<string>> }) => {
    const [search, setSearch] = useState<string>('')
    const router = useRouter();

    const handleSearch = () => {
        setQuery && setQuery(search)
        router.push(`/search?searchQuery=${search}`);

    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div>
            <div className="w-full max-w-sm min-w-[200px] mt-7 md:mt-0 ">
                <div className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>

                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="search"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button onClick={handleSearch} className="bg-red-700 mx-3 hover:bg-red-950 text-white py-2 px-4 rounded mr-2">
                        <Link href={search && `/search?searchQuery=${search}`}>
                            Search
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
