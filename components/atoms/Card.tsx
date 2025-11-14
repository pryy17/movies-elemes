import { MoviesTypes } from '@/services/getDataMovies';
import React from 'react';

const Card: React.FC<MoviesTypes> = ({ img, name }) => {
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
                        <p className="text-xl font-semibold text-white">
                            {name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
