import { Text, View } from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';
import { fontsToImport } from './src/styles/typography';

import AppNavigator from './src/navigators';
import { AuthProvider } from './src/store/context/Auth.context';

export default function App() {
  let [fontsLoaded] = useFonts(fontsToImport);

  if (!fontsLoaded) return <View><Text>App is loading...</Text></View> // TODO : add splash screen

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}




