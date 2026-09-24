import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const exploreCards = [
  {
    id: '1',
    tag: '#TechnoBeats',
    image: 'https://picsum.photos/id/1027/300/400',
  },
  {
    id: '2',
    tag: '#BluesBeats',
    image: 'https://picsum.photos/id/1005/300/400',
  },
  {
    id: '3',
    tag: '#FolkTales',
    image: 'https://picsum.photos/id/1039/300/400',
  },
];

const moodGenres = [
  { id: '1', name: 'Hip Hop', color: '#3AD1E0', image: require('./assets/eminem.png'), },
  { id: '2', name: 'Electronic', color: '#9B4DFF', image: require('./assets/dp.jpg'), },
  { id: '3', name: 'Pop', color: '#2FE0A6', image: require('./assets/ed.jpg'), },
  { id: '4', name: 'Party', color: '#FF3D8D', image: 'https://picsum.photos/id/1035/200/200' },
  { id: '5', name: 'Blues', color: '#5B5DF0', image: require('./assets/real.jpg'), },
  { id: '6', name: 'Techno', color: '#2FB8E0', image: require('./assets/piel.jpg'), },
];

export default function Vista3({ navigation }) {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        { }
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cancion"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
          />
          <Ionicons name="search" size={20} color="#9CA3AF" />
        </View>

        { }
        <Text style={styles.sectionTitle}>Explora</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exploreRow}
        >
          {exploreCards.map((card) => (
            <TouchableOpacity key={card.id} style={styles.exploreCard}>
              <Image source={{ uri: card.image }} style={styles.exploreImage} />
              <Text style={styles.exploreTag}>{card.tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        { }
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Generos</Text>
        <View style={styles.genreGrid}>
          {moodGenres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[styles.genreCard, { backgroundColor: genre.color }]}
            >
              <Text style={styles.genreName}>{genre.name}</Text>
              <Image
                source={typeof genre.image === 'string' ? { uri: genre.image } : genre.image}
                style={styles.genreImage}
              />
            </TouchableOpacity>
          ))}
        </View>


        <View style={{ height: 100 }} />
      </ScrollView>

      { }
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Vista1')}>
          <Ionicons name="home-outline" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={18} color="#000" />
          <Text style={styles.searchButtonText}>Search</Text>
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
    backgroundColor: '#CAA4D5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  exploreRow: {
    paddingRight: 20,
  },
  exploreCard: {
    width: 110,
    height: 150,
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  exploreImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  exploreTag: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    padding: 8,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreCard: {
    width: '48%',
    height: 70,
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  genreName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  genreImage: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 100,
    height: 100,
    borderRadius: 10,
    opacity: 0.9,
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
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D6FF3F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 13,
  },
});