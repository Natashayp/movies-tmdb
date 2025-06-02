export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  let watchlist = [];

  try {
    const res = await fetch("https://your-backend-api.com/api/watchlist", {
      cache: 'no-store',
    });
    watchlist = await res.json();
  } catch (err) {
    console.error("⚠ Failed to fetch watchlist:", err);
    watchlist = [];
  }

  return (
    <div>
      <h1>Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Tidak ada film dalam watchlist.</p>
      ) : (
        <ul>
          {watchlist.map((movie: any) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}