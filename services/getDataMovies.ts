/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./axios"

export interface MoviesTypes {
    name: string
    img: string
}

const urlImg = (path: string) => `https://image.tmdb.org/t/p/original${path}`

export const getTopRatedMovies: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title,
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

export const getUpcomingMovies: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title,
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

export const getNowPlayingMovies: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title,
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

export const getPopularMovies: any = async () => {
    try {
        const data: any = await apiService.get(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
        );
        const finalData: MoviesTypes[] = data.results.map((movie: any) => {
            return {
                name: movie.title,
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

export const getSearchMovies: any = async (query: string, page: number) => {
    try {
        const data: any = await apiService.get(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`
        )
        console.log(data)
        const finalData: {data :MoviesTypes[], totalPage: number} =
        {data: data.results.map((movie: any) => {
            return {
                name: movie.title,
                img: urlImg(movie.poster_path),
            }
        }),
        totalPage: data.total_pages
    }
        return finalData;
    } catch (err: any) {
        return {
            message: err?.message || "server not responding"
        };
    }
};