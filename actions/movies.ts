'use server';

import {
  creditsSchema,
  movieDetailsSchema,
  recommendationsSchema,
  TMovie,
} from '@/lib/schemas/movie-schemas';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB API Key is missing. Check your .env.local file.');
}

// Get Popular Movies
export const getMovies = async (page: number): Promise<TMovie[]> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch movies');

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error in getMovies:', error);
    return []; // fallback empty array, or dummy data if needed
  }
};

// Search Movies
export const searchMovies = async (
  query: string,
  page: number
): Promise<TMovie[]> => {
  if (!query || query.length < 3) {
    throw new Error('Query is too short');
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to search movies');

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Search movie error:', error);
    return [];
  }
};

// Movie Details
export const getMovieDetails = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch movie details');

    const data = await res.json();
    return movieDetailsSchema.parse(data);
  } catch (error) {
    console.error('Movie details error:', error);
    throw new Error('Invalid movie data received from API');
  }
};

// Movie Credits
export const getMovieCredits = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch cast data');

    const data = await res.json();
    return creditsSchema.parse(data);
  } catch (error) {
    console.error('Credits fetch error:', error);
    throw new Error('Invalid credits data received from API');
  }
};

// Movie Recommendations
export const getMovieRecommendations = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch recommendations');

    const data = await res.json();
    return recommendationsSchema.parse(data);
  } catch (error) {
    console.error('Recommendations fetch error:', error);
    throw new Error('Invalid recommendations data received from API');
  }
};
