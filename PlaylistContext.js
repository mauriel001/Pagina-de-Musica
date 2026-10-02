import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const PlaylistContext = createContext(null);

export const formatSongCount = (count) =>
  count === 1 ? '1 canción' : `${count} canciones`;


export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = useCallback((name) => {
    const cleanName = name.trim();
    if (!cleanName) return null;
    const newPlaylist = { id: `${Date.now()}`, name: cleanName, songIds: [] };
    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const addSongToPlaylist = useCallback((playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.songIds.includes(songId)
          ? { ...p, songIds: [...p.songIds, songId] }
          : p
      )
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songIds: p.songIds.filter((id) => id !== songId) }
          : p
      )
    );
  }, []);

  const value = useMemo(
    () => ({ playlists, createPlaylist, addSongToPlaylist, removeSongFromPlaylist }),
    [playlists, createPlaylist, addSongToPlaylist, removeSongFromPlaylist]
  );

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists debe usarse dentro de <PlaylistProvider>');
  }
  return context;
}