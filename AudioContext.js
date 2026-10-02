import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext(null);


const STORAGE_PREFIX = 'playback-position:';

const storage = {
  get(songId) {
    try {
      if (typeof localStorage === 'undefined') return 0;
      const raw = localStorage.getItem(STORAGE_PREFIX + songId);
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  },
  set(songId, millis) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_PREFIX + songId, String(millis));
    } catch {
    
    }
  },
};


export function AudioProvider({ children }) {
  const soundRef = useRef(null);
  const currentSongIdRef = useRef(null);
  const lastSaveRef = useRef(0);
  const isSeekingRef = useRef(false);
  const seekReleaseTimerRef = useRef(null);
  const lastLiveSeekRef = useRef(0);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  const savePosition = useCallback((millis) => {
    const id = currentSongIdRef.current;
    if (id != null && typeof millis === 'number') {
      storage.set(id, millis);
    }
  }, []);

  const handleStatusUpdate = useCallback((status) => {
    if (!status.isLoaded) return;

   
    if (!isSeekingRef.current) {
      setPositionMillis(status.positionMillis);
      setDurationMillis(status.durationMillis || 0);
    }

    if (status.didJustFinish) {
      setIsPlaying(false);
      setPositionMillis(0);
      savePosition(0); 
      return;
    }

  
    const now = Date.now();
    if (now - lastSaveRef.current > 2000) {
      lastSaveRef.current = now;
      savePosition(status.positionMillis);
    }
  }, [savePosition]);

  const unloadCurrent = useCallback(async () => {
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        savePosition(status.positionMillis);
      }
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, [savePosition]);

  const stop = useCallback(async () => {
    await unloadCurrent();
    setIsPlaying(false);
    setCurrentSongId(null);
    currentSongIdRef.current = null;
    setPositionMillis(0);
    setDurationMillis(0);
  }, [unloadCurrent]);

  const playSong = useCallback(async (song) => {
    if (!song?.audio) return;

  
    if (currentSongIdRef.current === song.id && soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        savePosition(status.positionMillis);
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

   
    await unloadCurrent();

    const startPosition = storage.get(song.id);
    const { sound } = await Audio.Sound.createAsync(
      song.audio,
      { shouldPlay: true, positionMillis: startPosition, progressUpdateIntervalMillis: 250 }
    );
    soundRef.current = sound;
    currentSongIdRef.current = song.id;
    setCurrentSongId(song.id);
    setIsPlaying(true);
    setPositionMillis(startPosition);
    setDurationMillis(0);
    sound.setOnPlaybackStatusUpdate(handleStatusUpdate);
  }, [unloadCurrent, savePosition, handleStatusUpdate]);

  const togglePlayback = useCallback(async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      savePosition(status.positionMillis);
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  }, [savePosition]);

 
  const seekTo = useCallback(async (millis) => {
    if (seekReleaseTimerRef.current) {
      clearTimeout(seekReleaseTimerRef.current);
      seekReleaseTimerRef.current = null;
    }
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(millis);
      savePosition(millis);
    }
    setPositionMillis(millis);
    isSeekingRef.current = false;
  }, [savePosition]);


  const seekPreview = useCallback((millis) => {
    isSeekingRef.current = true;
    setPositionMillis(millis);

    const now = Date.now();
    if (soundRef.current && now - lastLiveSeekRef.current > 150) {
      lastLiveSeekRef.current = now;
      soundRef.current.setPositionAsync(millis);
    }

    if (seekReleaseTimerRef.current) {
      clearTimeout(seekReleaseTimerRef.current);
    }
    seekReleaseTimerRef.current = setTimeout(() => {
      seekTo(millis);
    }, 400);
  }, [seekTo]);

  const value = useMemo(
    () => ({
      currentSongId,
      isPlaying,
      positionMillis,
      durationMillis,
      playSong,
      togglePlayback,
      seekPreview,
      seekTo,
      stop,
    }),
    [currentSongId, isPlaying, positionMillis, durationMillis, playSong, togglePlayback, seekPreview, seekTo, stop]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio debe usarse dentro de <AudioProvider>');
  }
  return context;
}