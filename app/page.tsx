import { SearchBar } from "@/components"
import {v2 as cloudinary} from "cloudinary"
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

// cloundinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//function to fetch Star War films
const getFilm = async () => {
  try{
    const res = await fetch("https://swapi.dev/api/films");
    const data = await res.json();

    return data;
  }
  catch (error){
    console.log(error);
    return "error"
  }
}


export default async function Home() {
  //fetch necessary resources
  let resources;
  try {
    resources = await cloudinary.search.expression('episode').execute();
  } catch (error) {
    resources = {resources: []};
  }
  
  const films = await getFilm();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-15 bg-black text-white">
      <div className="py-20">
        <h1 className="text-[1.5rem] text-center sm:text-header">Star War Search Typeahead</h1>
      </div>
      <SearchBar 
        films={films}
        resources={resources}
        />
    </main>
  );
}
