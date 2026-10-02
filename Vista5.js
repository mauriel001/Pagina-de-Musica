import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Text,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  List,
  Portal,
  useTheme,
} from 'react-native-paper';
import { songs } from './songs';
import { usePlaylists, formatSongCount } from './PlaylistContext';


const getSource = (image) => (typeof image === 'string' ? { uri: image } : image);

export default function Vista5({ route, navigation }) {
  const theme = useTheme();
  const { playlistId } = route.params;
  const { playlists, addSongToPlaylist, removeSongFromPlaylist } = usePlaylists();
  const [pickerVisible, setPickerVisible] = useState(false);

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.empty}>
          <Text variant="titleMedium">No se encontró la playlist</Text>
          <Button mode="contained" style={styles.emptyButton} onPress={() => navigation.goBack()}>
            Volver
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const playlistSongs = playlist.songIds
    .map((id) => songs.find((s) => s.id === id))
    .filter(Boolean);

  const toggleSong = (songId) => {
    if (playlist.songIds.includes(songId)) {
      removeSongFromPlaylist(playlist.id, songId);
    } else {
      addSongToPlaylist(playlist.id, songId);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <IconButton icon="chevron-left" size={28} onPress={() => navigation.goBack()} />
        <View style={styles.headerText}>
          <Text variant="titleLarge" numberOfLines={1}>
            {playlist.name}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {formatSongCount(playlistSongs.length)}
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        icon="plus"
        style={styles.addButton}
        onPress={() => setPickerVisible(true)}
      >
        Agregar canciones
      </Button>

      <FlatList
        data={playlistSongs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.artist}
            left={() => (
              <View style={styles.thumbWrap}>
                <Image source={getSource(item.image)} style={styles.thumb} />
              </View>
            )}
            right={() => (
              <IconButton
                icon="close"
                onPress={() => removeSongFromPlaylist(playlist.id, item.id)}
              />
            )}
            onPress={() => navigation.navigate('Vista2', { songId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="titleMedium">Esta playlist está vacía</Text>
            <Text
              variant="bodyMedium"
              style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
            >
              Agrega canciones para verlas aquí.
            </Text>
          </View>
        }
      />

      <Portal>
        <Dialog visible={pickerVisible} onDismiss={() => setPickerVisible(false)}>
          <Dialog.Title>Agregar canciones</Dialog.Title>
          <Dialog.ScrollArea style={styles.dialogScroll}>
            <ScrollView>
              {songs.map((song) => {
                const selected = playlist.songIds.includes(song.id);
                return (
                  <List.Item
                    key={song.id}
                    title={song.title}
                    description={song.artist}
                    left={() => (
                      <View style={styles.thumbWrap}>
                        <Image source={getSource(song.image)} style={styles.thumb} />
                      </View>
                    )}
                    right={() => (
                      <Checkbox.Android
                        status={selected ? 'checked' : 'unchecked'}
                        onPress={() => toggleSong(song.id)}
                      />
                    )}
                    onPress={() => toggleSong(song.id)}
                  />
                );
              })}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setPickerVisible(false)}>Listo</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerText: {
    flex: 1,
  },
  addButton: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
    flexGrow: 1,
  },
  thumbWrap: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 6,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 16,
  },
  dialogScroll: {
    maxHeight: 320,
    paddingHorizontal: 0,
  },
});