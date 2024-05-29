// Interface of the inputs

export interface SearchFilmProps{
    film: string;
    setFilm: (film: string) => void;
    films: {results: FilmInfoProps[]};
    resources: {resources: ResourceProps[]};
}

export interface SearchBarProps{
    films: {results: FilmInfoProps[]};
    resources: {resources: ResourceProps[]};
}

export interface FilmInfoProps{
    title: string;
    director: string;
    release_date: string;
    episode_id: string;
    opening_crawl: string;
    producer: string
}

export interface FilmCardProps{
    title: string;
    director: string;
    release_date: string;
    episode_id?: string;
    selected: boolean;
    focus: boolean;
    image: ResourceProps[]
}

export interface ResourceProps{
    public_id: string;
    asset_id: string;
    url: string
}