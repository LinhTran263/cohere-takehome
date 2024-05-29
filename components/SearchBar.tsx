"use client"

import Image from "next/image"

import SearchFilm from "./SearchFilm";

import { useState } from "react";
import { SearchBarProps } from "@/types";
import { CldImage } from "next-cloudinary";

const SearchBar = ({films, resources}: SearchBarProps) => {
    const [film, setFilm] = useState('');
    
    //extract the film choosen after searching
    const choosenFilm = (film !== "" && film !== null) ? films.results.filter((item)=>(
            item.title.toLowerCase().includes(film.toLowerCase()))) : [];
    //extrcat the poster image of the film after searching
    const choosenPoster = (choosenFilm.length > 0) ? resources.resources.filter((resource)=>(
            resource.public_id.toLowerCase().replace(/\s+/g, "").includes(String(choosenFilm[0].episode_id).toLowerCase().replace(/\s+/g, "")))) 
            : [{
                url: "/placeholder.jpeg",
                asset_id: "placeholder",
                public_id: "placeholder"
        }];
        

    return (
    <div className="flex flex-col w-full justify-start w-full relative max-w-3xl">
        {/* Search Bar that handles dynamically display the search values */}
        <form className='search-page'>
            <div className='search-bar-container'>
                <SearchFilm
                    film={film}
                    setFilm={setFilm}
                    films={films}
                    resources={resources}
                />
            </div>
        </form>

        {/* Display the chosen film information and poster, also handle placeholder image and cloudinary image differently */}
        {(choosenFilm?.length > 0 && choosenPoster.length > 0) ? (
            <div className="flex flex-col items-center w-full justify-center relative max-w-3xl mt-6">
                <p className="text-white text-[1.5rem] font-bold">{choosenFilm[0].title}</p>
                {choosenPoster[0].public_id !== "placeholder" ? (
                    <CldImage 
                    width={183}
                    height={275}
                    src={choosenPoster[0].url}
                    alt={choosenPoster[0].public_id}
                    />
                ) : (
                    <Image 
                    width={183}
                    height={275}
                    src={choosenPoster[0].url}
                    alt={choosenPoster[0].public_id}
                    />
                )}
                <p className="text-white">Director: {choosenFilm[0].director}</p>
                <p className="text-white">Release Date: {choosenFilm[0].release_date}</p>
            </div>
        ) : null }
    </div>
    )
}

export default SearchBar