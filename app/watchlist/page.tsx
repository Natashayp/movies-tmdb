import { getWatchlistProducts } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';

const WatchlistPage = async () => {
    const watchlist = await getWatchlistProducts();

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Mymymy watchlist is empty.</p>
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
