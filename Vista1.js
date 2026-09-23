import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const categories = ['Todas', 'Rock', 'Blues', 'Alternativo', 'Hip Hop'];

const popularSongs = [
  {
    id: '1',
    title: 'ROY',
    artist: 'NSQK',
    image: require('./assets/ROY.jpg'),
  },
  {
    id: '2',
    title: 'Parachutes',
    artist: 'Coldplay',
    image: require('./assets/parachutes.jpg'),
  },
  {
    id: '3',
    title: 'Significant Other',
    artist: 'Limp Bizkit',
    image: require('./assets/Significant Other.jpg'),
  },
];

export default function Vista1() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Bienvenido, <Text style={styles.name}>Usuario</Text>
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton}>
              <Ionicons name="person" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Seleciona la categoria</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Popular Songs */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Canciones Populares</Text>
          <TouchableOpacity style={styles.seeAllRow}>
            <Text style={styles.seeAll}>Mas</Text>
            <Feather name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.songsRow}
        >
          {popularSongs.map((song) => (
            <TouchableOpacity key={song.id} style={styles.songCard}>
              <Image
                source={typeof song.image === 'string' ? { uri: song.image } : song.image}
                style={styles.songImage}
              />
              <View style={styles.songAccentBar} />
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* New Collection */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Nueva coleccion</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collectionRow}
        >
          <View style={[styles.collectionCard, { backgroundColor: '#fff' }]}>
            <Text style={styles.collectionTitle}>Top Canciones{'\n'}Globales</Text>
            <Text style={styles.collectionSubtitle}>Descubre 80 canciones</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
            <Image
              source={require('./assets/BB.png')}
              style={styles.collectionImage}
            />
          </View>

          <View style={[styles.collectionCard, { backgroundColor: '#BFEFFF' }]}>
            <Text style={[styles.collectionTitle, { color: '#000' }]}>Descubre{'\n'}Discos</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
            <Image
              source={require('./assets/BB.png')}
              style={styles.collectionImage}
            />
          </View>
        </ScrollView>

        {/* Playlist */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Playlist</Text>
          <TouchableOpacity style={styles.seeAllRow}>
            <Text style={styles.seeAll}>Mas</Text>
            <Feather name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.homeButton}>
          <Ionicons name="home" size={18} color="#000" />
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="search" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="albums-outline" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACC0D3',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D6FF3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    color: '#9CA3AF',
    fontSize: 13,
    marginRight: 2,
  },
  categoriesRow: {
    paddingRight: 20,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#D6FF3F',
  },
  categoryText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#000',
  },
  songsRow: {
    paddingRight: 20,
  },
  songCard: {
    width: 130,
    marginRight: 14,
  },
  songImage: {
    width: 130,
    height: 130,
    borderRadius: 14,
    marginBottom: 8,
  },
  songAccentBar: {
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D6FF3F',
    marginBottom: 6,
  },
  songTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  songArtist: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  collectionRow: {
    paddingRight: 20,
  },
  collectionCard: {
    width: 300,
    height: 140,
    borderRadius: 18,
    padding: 18,
    marginRight: 14,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  collectionSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  collectionImage: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 110,
    height: 130,
    borderRadius: 12,
  },
  arrowButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    paddingVertical: 14,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D6FF3F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  homeButtonText: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 13,
  },
});