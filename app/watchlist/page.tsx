import { getWatchlistProducts } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';

const WatchlistPage = async () => {
    const watchlist = await getWatchlistProducts();

    return (
        <div className="container py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">🎬 Your Watchlist</h1>

            {watchlist.length === 0 ? (
                <div className="text-center text-gray-500 animate-pulse">
                    <p>Your watchlist is empty. Start adding movies!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {watchlist.map((movie) => (
                        <MovieCardWatchlistWrapper
                            movieId={movie.id}
                            key={movie.id}
                        >
                            <div className="transition-transform duration-200 hover:scale-105">
                                <MovieCard movie={movie} />
                            </div>
                        </MovieCardWatchlistWrapper>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;


/*
import { getWatchlistProducts } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';

const WatchlistPage = async () => {
    const watchlist = await getWatchlistProducts();

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {watchlist.map((movie) => (
                        <MovieCardWatchlistWrapper
                            movieId={movie.id}
                            key={movie.id}
                        >
                            <MovieCard movie={movie} />
                        </MovieCardWatchlistWrapper>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;

*/