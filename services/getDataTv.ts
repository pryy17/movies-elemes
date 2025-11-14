/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./axios"

export interface MoviesTypes {
    name: string
    img: string
}

const urlImg = (path: string) => `https://image.tmdb.org/t/p/original${path}`

export const getAiringToday: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title || movie.name,
                img: urlImg(movie.poster_path)
            }
        });
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};

export const getOnTheAirTv: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title || movie.original_name,
                img: urlImg(movie.poster_path)
            }
        });
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};

export const getPopularTv: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title || movie.original_name,
                img: urlImg(movie.poster_path)
            }
        });
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};

export const getTopRatedTv: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title || movie.original_name,
                img: urlImg(movie.poster_path)
            }
        });
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};

export const getSearchMovies: any = async (query: string) => {
    try {
        const data: any = await apiService.get(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`
        )
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title || movie.original_name,
                img: urlImg(movie.poster_path)
            }
        });
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};