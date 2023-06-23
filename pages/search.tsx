import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from "next/head";
import Header from "../components/header";

const SearchPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const searchMovies = async (query) => {
        const apiKey = 'ff4db3';

        try {
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
                query
            )}&apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!session) {
            // Redirect if the user is not registered
            router.replace('/login');
        } else {
            // Fetch movies when the component mounts
            searchMovies(searchValue);
        }
    }, [session, router, searchValue]);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchValue(query);
        searchMovies(query);
    };

    return (
        <div>
            <Head>
                <title>Search movie</title>
            </Head>
            <Header />
            <main className="main-search">
                <h1>Search Page</h1>
                <input
                    type="text"
                    placeholder="Enter desired movie title"
                    className="search-input"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />

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

export default SearchPage;
