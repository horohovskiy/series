import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const url = 'https://www.omdbapi.com/?s=avengers&apikey=ff4db3';

        try {
            const response = await fetch(url);
            const result = await response.json();
            setMovies(result.Search); // Assuming the movie results are in the 'Search' property
        } catch (error) {
            console.error(error);
        }
    };

    fetchMovies();



    const [movies2, setMovies2] = useState([]);

    const fetchMovies2 = async () => {
        const url = 'https://www.omdbapi.com/?s=starwars&apikey=ff4db3';

        try {
            const response = await fetch(url);
            const result = await response.json();
            setMovies2(result.Search); // Assuming the movie results are in the 'Search' property
        } catch (error) {
            console.error(error);
        }
    };

    fetchMovies2();





    const [movies3, setMovies3] = useState([]);

    const fetchMovies3 = async () => {
        const url = 'https://www.omdbapi.com/?s=pirates&apikey=ff4db3';

        try {
            const response = await fetch(url);
            const result = await response.json();
            setMovies3(result.Search); // Assuming the movie results are in the 'Search' property
        } catch (error) {
            console.error(error);
        }
    };

    fetchMovies3();

  return (
    <div>
      <Head>
        <title>SERIES - Movie hosting service</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-block">
          <div>
              <img src="/logo-series-white.png"/>
          </div>


          <div className="main-title">
              <h1>
                  Unlimited Movies at Your Fingertips
              </h1>
              <Link href="/movies" className="main-link">
                  Try new way of watching movies
              </Link>
          </div>
      </div>

      <main>

          <div className="list-block">
              <h2>Avengers Week</h2>
              <div className="movie-list">
                  {movies.map((movie) => (
                      <div key={movie.imdbID} className="item">
                          <img src={movie.Poster} alt={movie.Title} />
                          <p>{movie.Title}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="list-block">
              <h2>StarWars Best</h2>
              <div className="movie-list">
                  {movies2.map((movie) => (
                      <div key={movie.imdbID} className="item">
                          <img src={movie.Poster} alt={movie.Title} />
                          <p>{movie.Title}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="list-block">
              <h2>Pirates of the Caribbean Weekends</h2>
              <div className="movie-list">
                  {movies3.map((movie) => (
                      <div key={movie.imdbID} className="item">
                          <img src={movie.Poster} alt={movie.Title} />
                          <p>{movie.Title}</p>
                      </div>
                  ))}
              </div>
          </div>

      </main>

      <footer className="">

      </footer>
    </div>
  )
}

export default Home
