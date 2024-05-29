import React from 'react'
import Image from 'next/image'
import { FilmCardProps } from '@/types'
import { CldImage } from 'next-cloudinary'

//function to format the date data
function formatDate(dateString: string) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Extract the day, month, and year from the Date object
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}

  
const FilmCard = ({title, director, release_date, episode_id, selected, focus, image}: FilmCardProps) => {

  return (
    <div className='grid grid-cols-3 gap-4 justify-items-start items-center gap-4 p-5'>
        {/* display placeholder if no image found, else display the according image */}
        {image.length > 0 ? (
                  <CldImage 
            width={183}
            height={275}
            src={image[0].url}
            alt={image[0].public_id}
            />
        ) : (
          <Image 
          width={183}
          height={275}
          src="/placeholder.jpeg"
          alt="placeholder"
          />

        )}

        {/* display film information */}
        <div className='col-start-2 col-span-2 align-self-start'>
          <span className={`block text-film-name text-[1rem] sm:text-title ${selected ? "font-medium" : "font-normal"}`}>
          {title} ({formatDate(release_date)})
          </span>
          <span className={`block ${selected ? "font-medium" : "font-normal"}`}>
          Director: {director}
          </span>

          {selected ? (
          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus? "text-white": "text-primary-purple"}`}
          ></span>
          ) : null}
        </div>
    </div>
    
  )
}

export default FilmCard