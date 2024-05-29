"use client"

import { FilmCardProps, FilmInfoProps, SearchFilmProps } from '@/types'
import React, { useState, Fragment } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import FilmCard from './FilmCard'

const SearchFilm = ({film, setFilm, films, resources}: SearchFilmProps) => {

  const [query, setQuery] = useState("");

  const chooseFilter = (query: string) => {
    let results = films.results.filter((item)=>(
      item.title.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
  ));

  // Dynamically checking for the results of the search query string
    if (results.length === 0) {
      results = films.results.filter((item)=>(
        item.director.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
    ));
      if (results.length === 0) {
        results = films.results.filter((item)=>(
          item.opening_crawl.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
      ));

        if (results.length === 0) {
          results = films.results.filter((item)=>(
            item.producer.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        ));
          if (results.length === 0) {
            results = films.results.filter((item)=>(
              item.release_date.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
          ));
          }
        }
      }
    }

    return results;
  }

  const filteredFilms = query === "" 
  ? films.results : chooseFilter(query)


  return (
    <div className='flex-1 max-sm:w-full flex justify-start items-center'>
      <Combobox value={film} onChange={setFilm}>
        <div className='relative w-full'>
          {/* Search bar input box */}
          <ComboboxInput
            className='search-bar'
            placeholder='Search a Star War Movie'
            displayValue={(film: string) => film}
            onChange={(e)=>setQuery(e.target.value)}
          >
          </ComboboxInput>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            {/* Dynamically display the film search results based on the query keyword */}
            <ComboboxOptions className="max-h-100 overflow-y-scroll bg-slate-900 pt-1">
              {filteredFilms.length === 0 && query !== '' ? (
                <ComboboxOption
                  value={query}
                  className="search"
                  >
                  No matching search with "{query}"
                </ComboboxOption>
              ): (
                filteredFilms.map((item: FilmInfoProps) => (
                  <ComboboxOption
                      key={item.title}
                      className={({focus}) => `search-card ${focus ? 'bg-slate-400 text-white': 'text-white'}`}
                      value={item.title}>
                          {({selected, focus}) => (
                            <FilmCard 
                              title={item.title}
                              director={item.director}
                              release_date={item.release_date}
                              episode_id={item.episode_id}
                              selected={selected}
                              focus={focus}
                              image={resources.resources.filter((resource)=>(
                                resource.public_id.toLowerCase().replace(/\s+/g, "").includes(String(item.episode_id).toLowerCase().replace(/\s+/g, ""))))}
                            />

                          )}
                  </ComboboxOption>
              ))

              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchFilm