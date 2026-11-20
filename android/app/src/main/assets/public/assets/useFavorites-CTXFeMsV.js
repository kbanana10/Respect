import { r as reactExports } from "./vendor-react--N-K1Ubq.js";
function useFavorites() {
  const [favorites, setFavorites] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("kurmanji_favorites");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  reactExports.useEffect(() => {
    localStorage.setItem("kurmanji_favorites", JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = { ...prev };
      if (newFavs[id]) {
        delete newFavs[id];
      } else {
        newFavs[id] = true;
      }
      return newFavs;
    });
  };
  const isFavorite = (id) => !!favorites[id];
  return { favorites, toggleFavorite, isFavorite };
}
export {
  useFavorites as u
};
