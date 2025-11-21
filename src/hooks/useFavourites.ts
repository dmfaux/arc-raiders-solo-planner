import { useEffect, useState, useCallback } from "react";
import { getFavouriteIds, toggleFavourite } from "../utils/localFavourites";

export function useFavourites(storageKey: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getFavouriteIds(storageKey));
  }, [storageKey]);

  const toggle = useCallback(
    (id: string) => {
      const next = toggleFavourite(storageKey, id);
      setIds(next);
    },
    [storageKey]
  );

  const isFav = useCallback(
    (id: string) => ids.includes(id),
    [ids]
  );

  return {
    favouriteIds: ids,
    isFavourite: isFav,
    toggleFavourite: toggle,
  };
}

