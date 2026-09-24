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

export default function Vista2({ route, navigation }) {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0.28);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={26} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>Reproduciendo desde el Album</Text>
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
          value={progress}
          onValueChange={setProgress}
          minimumTrackTintColor="#D6FF3F"
          maximumTrackTintColor="#3A3A3C"
          thumbTintColor="#D6FF3F"
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>1:37</Text>
          <Text style={styles.timeText}>4:21</Text>
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
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
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
        <Text style={styles.lyricsText}>Letra</Text>
        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 24,
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