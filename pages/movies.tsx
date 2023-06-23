import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from "next/head";
import Header from "../components/header";

const MoviesPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const searchQuery = 'action'; // Specify your search query here
    const resultsPerPage = 20; // Number of movies per page
    const totalPages = 5; // Total number of pages to fetch (e.g., 5 pages * 20 results per page = 100 movies)

    const fetchMovies = async () => {
        const apiKey = 'ff4db3';

        try {
            const fetchPage = async (page) => {
                const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=ff4db3&page=${page}`;
                const response = await fetch(url);
                const result = await response.json();
                return result.Search || [];
            };

            const moviePromises = [];
            for (let page = 1; page <= totalPages; page++) {
                moviePromises.push(fetchPage(page));
            }

            const movieResults = await Promise.all(moviePromises);
            const mergedResults = movieResults.reduce((acc, cur) => [...acc, ...cur], []);
            setMovies(mergedResults);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!session) {
            // Redirect if the user is not registered
            router.replace('/login');
        } else {
            fetchMovies(); // Fetch movies when the component mounts
        }
    }, [session, router]);

    return (
        <div>
            <Head>
                <title>Movies</title>
            </Head>
            <Header/>
            <main className="main-movies">

                <h1>Movies Page</h1>

                <div className="movies-grid">
                    {movies.map((movie) => (
                        <div key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>{movie.Title}</p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default MoviesPage;
