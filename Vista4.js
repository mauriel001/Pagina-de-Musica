import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Button,
  Dialog,
  FAB,
  IconButton,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { usePlaylists, formatSongCount } from './PlaylistContext';

export default function Vista4({ navigation }) {
  const theme = useTheme();
  const { playlists, createPlaylist } = usePlaylists();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [name, setName] = useState('');

  const closeDialog = () => {
    setDialogVisible(false);
    setName('');
  };

  const handleCreate = () => {
    const created = createPlaylist(name);
    if (!created) return;
    closeDialog();
    // Al crearla, se abre la playlist para agregar canciones de inmediato.
    navigation.navigate('Vista5', { playlistId: created.id });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <IconButton icon="chevron-left" size={28} onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Mis playlists</Text>
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('Vista5', { playlistId: item.id })}
          >
            <Card.Title
              title={item.name}
              subtitle={formatSongCount(item.songIds.length)}
              left={(props) => <Avatar.Icon {...props} icon="playlist-music" />}
              right={(props) => <IconButton {...props} icon="chevron-right" />}
            />
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="titleMedium">Aún no tienes playlists</Text>
            <Text
              variant="bodyMedium"
              style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
            >
              Crea una y agrega tus canciones favoritas.
            </Text>
            <Button mode="contained" icon="plus" onPress={() => setDialogVisible(true)}>
              Crear playlist
            </Button>
          </View>
        }
      />

      {playlists.length > 0 && (
        <FAB
          icon="plus"
          label="Nueva playlist"
          style={styles.fab}
          onPress={() => setDialogVisible(true)}
        />
      )}

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Nueva playlist</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Nombre de la playlist"
              value={name}
              onChangeText={setName}
              maxLength={40}
              autoFocus
              onSubmitEditing={handleCreate}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={handleCreate} disabled={!name.trim()}>
              Crear
            </Button>
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
  listContent: {
    padding: 20,
    paddingBottom: 120,
    flexGrow: 1,
  },
  card: {
    marginBottom: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 6,
    marginBottom: 20,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
  },
});