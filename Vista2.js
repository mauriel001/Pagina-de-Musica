import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { songs } from './songs';
import { useAudio } from './AudioContext';


const formatTime = (millis) => {
  if (!millis || millis < 0) return '0:00';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function Vista2({ route, navigation }) {
  const { songId } = route.params || {};
  const song = songs.find((s) => s.id === songId);
  const {
    currentSongId,
    isPlaying,
    positionMillis,
    durationMillis,
    playSong,
    seekPreview,
    seekTo,
  } = useAudio();
  const [isFavorite, setIsFavorite] = useState(false);
  const songIsPlaying = currentSongId === song?.id && isPlaying;
  const isCurrentSong = currentSongId === song?.id;
  const sliderValue = isCurrentSong && durationMillis > 0 ? positionMillis / durationMillis : 0;

  if (!song) {
    return (
      <SafeAreaView style={[styles.container, styles.notFound]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Text style={styles.songTitle}>No se encontró la canción</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Vista1')} style={styles.backLink}>
          <Text style={styles.songArtist}>Volver al inicio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={26} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>PLAYING FROM ALBUM</Text>
          <Text style={styles.headerAlbum}>{song.title}</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.artWrapper}>
        <Image
          source={typeof song.image === 'string' ? { uri: song.image } : song.image}
          style={styles.albumArt}
        />
      </View>

      {}
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#D6FF3F' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.progressSection}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          onValueChange={(value) => {
            if (durationMillis > 0) seekPreview(value * durationMillis);
          }}
          onSlidingComplete={(value) => {
            if (durationMillis > 0) seekTo(value * durationMillis);
          }}
          minimumTrackTintColor="#D6FF3F"
          maximumTrackTintColor="#3A3A3C"
          thumbTintColor="#D6FF3F"
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>
            {formatTime(isCurrentSong ? positionMillis : 0)}
          </Text>
          <Text style={styles.timeText}>
            {formatTime(isCurrentSong ? durationMillis : 0)}
          </Text>
        </View>
      </View>

      {}
      <View style={styles.controlsRow}>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playSong(song)}
        >
          <Ionicons
            name={songIsPlaying ? 'pause' : 'play'}
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="repeat" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {}
      <TouchableOpacity style={styles.lyricsSection}>
        <Text style={styles.lyricsText}>LYRICS</Text>
        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLink: {
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    letterSpacing: 1,
  },
  headerAlbum: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  artWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  songArtist: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4,
  },
  progressSection: {
    marginTop: 24,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 10,
  },
  playButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#D6FF3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lyricsSection: {
    alignItems: 'center',
    marginTop: 36,
  },
  lyricsText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
});