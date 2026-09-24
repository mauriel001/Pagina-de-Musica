import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Vista1 from './Vista1';
import Vista2 from './Vista2';
import Vista3 from './Vista3';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Vista1" component={Vista1} />
        <Stack.Screen name="Vista2" component={Vista2} />
        <Stack.Screen name="Vista3" component={Vista3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}