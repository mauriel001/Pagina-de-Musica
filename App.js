import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { PlaylistProvider } from './PlaylistContext';
import { AudioProvider } from './AudioContext';
import Vista1 from './Vista1';
import Vista2 from './Vista2';
import Vista3 from './Vista3';
import Vista4 from './Vista4';
import Vista5 from './Vista5';

const Stack = createNativeStackNavigator();


const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#D6FF3F',
    onPrimary: '#000000',
    primaryContainer: '#D6FF3F',
    onPrimaryContainer: '#000000',
    background: '#000000',
    surface: '#1C1C1E',
    surfaceVariant: '#2A2A2C',
    onSurfaceVariant: '#9CA3AF',
    elevation: {
      level0: 'transparent',
      level1: '#1C1C1E',
      level2: '#232325',
      level3: '#2A2A2C',
      level4: '#2E2E30',
      level5: '#333335',
    },
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <PlaylistProvider>
        <AudioProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Vista1" component={Vista1} />
              <Stack.Screen name="Vista2" component={Vista2} />
              <Stack.Screen name="Vista3" component={Vista3} />
              <Stack.Screen name="Vista4" component={Vista4} />
              <Stack.Screen name="Vista5" component={Vista5} />
            </Stack.Navigator>
          </NavigationContainer>
        </AudioProvider>
      </PlaylistProvider>
    </PaperProvider>
  );
}